from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import datetime
import locale
import torch
from segment_anything import SamPredictor, build_sam
import cv2

import requests
from PIL import Image, ImageEnhance
from io import BytesIO
import os

import environ
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(env_file=Path().joinpath(BASE_DIR, "KrishiJunctionBackend", ".env"))


# Create your views here.
def yeild_prediction(request):
    # TODO: crop month se kharif ya rabi ya whole year aur state aur distric ka dekhna hai from crop_production csv
    Crop = request.GET['crop']
    area = request.GET['area']
    state = [request.GET['state']]
    district = [request.GET['district']]
    season = ["Kharif"]
    print(Crop, area, state, district)
    year = datetime.datetime.today().year

    data = pd.read_csv(env("YEILD_PREDICTION"))
    data.dropna(axis=0, inplace=True)
    data = data[data['Production'] !=0]
    features =  ['state','district','Crop_Year','season','Area']
    predict = 'Production'
    df = data[data['Crop']==Crop]
    df.head()
    les = LabelEncoder()
    df['season'] = les.fit_transform(df["Season"].str.strip())
    led = LabelEncoder()
    df["district"] = led.fit_transform(df["District_Name"])
    lest = LabelEncoder()
    df["state"] = lest.fit_transform(df["State_Name"])
    X = df[features]
    y = df[predict]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15)
    model = RandomForestRegressor()
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    State = lest.transform(state)[0]
    District = led.transform(district)[0]
    Season = les.transform(season)[0]
    test = [[State,District,2023,Season,float(area)]]
    result_prediction = model.predict(test)[0]

    return JsonResponse({
        "score": score,
        "result_prediction": result_prediction
    },safe=False)


def estimate_income(request):
    State = "Tamil Nadu"
    District = "Ariyalur"
    
    price = prices.loc[(prices['state']==State) &
                    (prices['district']==District)]
    price = np.array(price["modal_price"])
    return JsonResponse({
        ""
    })

def ndvi(request):
    import groundingdino.datasets.transforms as T
    from groundingdino.models import build_model
    from groundingdino.util import box_ops
    from groundingdino.util.slconfig import SLConfig
    from groundingdino.util.utils import clean_state_dict, get_phrases_from_posmap
    from groundingdino.util.inference import annotate, predict
    from huggingface_hub import hf_hub_download
    from typing import Tuple
    device = 'cpu'
    def load_dataset(path):
        images = []
        names = []
        for file_name in os.listdir(path):
            if file_name.endswith("_rgb.png"):
                image_path = os.path.join(path, file_name)
                image = Image.open(image_path).convert("RGB")
                images.append(image)
                names.append(file_name.replace("_rgb.png", ""))
        return images, names
    canon_img_path = "/home/shivam_akhouri2020/solvingforindiaregional/GroundingDINO/Plant_Phenotyping_Datasets/Plant/Ara2013-Canon"
    rpi_img_path = "/home/shivam_akhouri2020/solvingforindiaregional/GroundingDINO/Plant_Phenotyping_Datasets/Plant/Ara2013-RPi"
    canon_imgs, canon_names = load_dataset(canon_img_path)
    print("Cannon: ",len(canon_imgs))
    rpi_imgs, rpi_names = load_dataset(rpi_img_path)
    print("RPi: ",len(rpi_imgs))
    def calculate_ndvi(red_band, green_band):
        red_array = np.array(red_band, dtype=float)
        green_array = np.array(green_band, dtype=float)
        ndvi = (green_array - red_array) / (green_array + red_array)
        return ndvi
    def get_results(dataset, names, colormap, path, normalization):
        ndvi_values = []
        for im, name in zip(dataset, names):
            cont = ImageEnhance.Contrast(im)
            imgc = cont.enhance(1.5)
            r, g, b = imgc.split()

            ndvi = calculate_ndvi(r, g)
            ndvi_values.append(np.mean(ndvi.astype(np.uint8)))
            ndvi_normalized = ((ndvi + 1) * normalization).astype(np.uint8)
            colormapped = cv2.applyColorMap(ndvi_normalized, colormap)

            ndvi_normalized = Image.fromarray(ndvi_normalized)
            ndvi_normalized.save(os.path.join(path, f'{name}_ndvi.png'))
            ndvi_colormapped = Image.fromarray(colormapped)
            ndvi_colormapped.save(os.path.join(path, f'{name}_ndvi_colormapped.png'))
        df = pd.DataFrame({'Image Name': names, 'Mean NDVI': ndvi_values})
        df.to_csv(os.path.join(path, 'ndvi_mean_values.csv'), index=False)
    fastie = np.zeros((256, 1, 3), dtype=np.uint8)
    fastie[:, 0, 2] = [255, 250, 246, 242, 238, 233, 229, 225, 221, 216, 212, 208, 204, 200, 195, 191, 187, 183, 178, 174, 170, 166, 161, 157, 153, 149, 145, 140, 136, 132, 128, 123, 119, 115, 111, 106, 102, 98, 94, 90, 85, 81, 77, 73, 68, 64, 60, 56, 52, 56, 60, 64, 68, 73, 77, 81, 85, 90, 94, 98, 102, 106, 111, 115, 119, 123, 128, 132, 136, 140, 145, 149, 153, 157, 161, 166, 170, 174, 178, 183, 187, 191, 195, 200, 204, 208, 212, 216, 221, 225, 229, 233, 238, 242, 246, 250, 255, 250, 245, 240, 235, 230, 225, 220, 215, 210, 205, 200, 195, 190, 185, 180, 175, 170, 165, 160, 155, 151, 146, 141, 136, 131, 126, 121, 116, 111, 106, 101, 96, 91, 86, 81, 76, 71, 66, 61, 56, 66, 77, 87, 98, 108, 119, 129, 140, 131, 122, 113, 105, 96, 87, 78, 70, 61, 52, 43, 35, 26, 17, 8, 0, 7, 15, 23, 31, 39, 47, 55, 63, 71, 79, 87, 95, 103, 111, 119, 127, 135, 143, 151, 159, 167, 175, 183, 191, 199, 207, 215, 223, 231, 239, 247, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]
    fastie[:, 0, 1] = [255, 250, 246, 242, 238, 233, 229, 225, 221, 216, 212, 208, 204, 200, 195, 191, 187, 183, 178, 174, 170, 166, 161, 157, 153, 149, 145, 140, 136, 132, 128, 123, 119, 115, 111, 106, 102, 98, 94, 90, 85, 81, 77, 73, 68, 64, 60, 56, 52, 56, 60, 64, 68, 73, 77, 81, 85, 90, 94, 98, 102, 106, 111, 115, 119, 123, 128, 132, 136, 140, 145, 149, 153, 157, 161, 166, 170, 174, 178, 183, 187, 191, 195, 200, 204, 208, 212, 216, 221, 225, 229, 233, 238, 242, 246, 250, 255, 250, 245, 240, 235, 230, 225, 220, 215, 210, 205, 200, 195, 190, 185, 180, 175, 170, 165, 160, 155, 151, 146, 141, 136, 131, 126, 121, 116, 111, 106, 101, 96, 91, 86, 81, 76, 71, 66, 61, 56, 66, 77, 87, 98, 108, 119, 129, 140, 147, 154, 161, 168, 175, 183, 190, 197, 204, 211, 219, 226, 233, 240, 247, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 249, 244, 239, 233, 228, 223, 217, 212, 207, 201, 196, 191, 185, 180, 175, 170, 164, 159, 154, 148, 143, 138, 132, 127, 122, 116, 111, 106, 100, 95, 90, 85, 79, 74, 69, 63, 58, 53, 47, 42, 37, 31, 26, 21, 15, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    fastie[:, 0, 0] = [255, 250, 246, 242, 238, 233, 229, 225, 221, 216, 212, 208, 204, 200, 195, 191, 187, 183, 178, 174, 170, 166, 161, 157, 153, 149, 145, 140, 136, 132, 128, 123, 119, 115, 111, 106, 102, 98, 94, 90, 85, 81, 77, 73, 68, 64, 60, 56, 52, 56, 60, 64, 68, 73, 77, 81, 85, 90, 94, 98, 102, 106, 111, 115, 119, 123, 128, 132, 136, 140, 145, 149, 153, 157, 161, 166, 170, 174, 178, 183, 187, 191, 195, 200, 204, 208, 212, 216, 221, 225, 229, 233, 238, 242, 246, 250, 255, 250, 245, 240, 235, 230, 225, 220, 215, 210, 205, 200, 195, 190, 185, 180, 175, 170, 165, 160, 155, 151, 146, 141, 136, 131, 126, 121, 116, 111, 106, 101, 96, 91, 86, 81, 76, 71, 66, 61, 56, 80, 105, 130, 155, 180, 205, 230, 255, 239, 223, 207, 191, 175, 159, 143, 127, 111, 95, 79, 63, 47, 31, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 31, 47, 63, 79, 95, 111, 127, 143, 159, 175, 191, 207, 223, 239]
    def load_image(image_path: str) -> Tuple[np.array, torch.Tensor]:
        transform = T.Compose(
            [
                T.RandomResize([800], max_size=1333),
                T.ToTensor(),
                T.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
            ]
        )
        image_source = Image.open(image_path).convert("RGB")
        image_source.thumbnail((800,800))
        image = np.asarray(image_source)
        image_transformed, _ = transform(image_source, None)
        return image, image_transformed
    def load_images(path):
        images = []
        image_sources = []
        names = []
        for file_name in os.listdir(path):
            if file_name.endswith("_rgb.png"):
                image_path = os.path.join(path, file_name)
                image_source, image = load_image(image_path)
                image_sources.append(image_source)
                images.append(image)
                names.append(file_name.replace("_rgb.png", ""))
        return image_sources, images, names
    canon_img_sources, canon_imgs, canon_names = load_images(canon_img_path)
    print("Cannon: ",len(canon_imgs))
    rpi_img_sources, rpi_imgs, rpi_names = load_images(rpi_img_path)
    print("RPi: ",len(rpi_imgs))
    print("Reached Load Model")
    def load_model(path, config, device='cpu'):
        args = SLConfig.fromfile(config)
        args.device = device
        model = build_model(args)

        checkpoint = torch.load(path, map_location=device)
        log = model.load_state_dict(clean_state_dict(checkpoint['model']), strict=False)
        print("Model loaded from {} \n => {}".format(path, log))
        _ = model.eval()
        return model

    gdmodel = load_model("/home/shivam_akhouri2020/solvingforindiaregional/GroundingDINO/groundingdino_swinb_cogcoor.pth", "/home/shivam_akhouri2020/solvingforindiaregional/GroundingDINO/GroundingDINO_SwinB.cfg.py", device)
    def detect_plants(image_sources, images, names, path, gdmodel):
        frames = []
        box_list = []
        plants = []
        for image_source, image, name in zip(image_sources, images, names):
            boxes, logits, phrases = predict(model = gdmodel, device=device, image = image, caption = "plant", box_threshold = 0.3, text_threshold = 0.25)
            frame = annotate(image_source = image_source, boxes = boxes, logits = logits, phrases = phrases)
            frame = frame[...,::-1]
            frames.append(frame)
            box_list.append(boxes)
            plants.append(len(boxes))
            img = Image.fromarray(frame)
            img.save(os.path.join(path, f'{name}_boxed.png'))
        df = pd.DataFrame({'Image Name': names, 'Number of plants detected': plants})
        df.to_csv(os.path.join(path, 'GD_plants_detected.csv'), index=False)
        return frames, box_list
    canon_img_frames, canon_img_boxes = detect_plants(canon_img_sources, canon_imgs, canon_names, canon_img_path, gdmodel)
    rpi_img_frames, rpi_img_boxes = detect_plants(rpi_img_sources, rpi_imgs, rpi_names, rpi_img_path, gdmodel)
    data = pd.read_csv(canon_img_path + "/GD_plants_detected.csv")
    temp = data[data['Number of plants detected'] > 1]
    temp.head()
    sam = SamPredictor(build_sam(checkpoint="/home/shivam_akhouri2020/solvingforindiaregional/GroundingDINO/sam_vit_h_4b8939.pth").to(device))
    def segment(image, sam_model, boxes):
        sam_model.set_image(image)
        H, W, _ = image.shape
        boxes_xyxy = box_ops.box_cxcywh_to_xyxy(boxes) * torch.Tensor([W, H, W, H])

        transformed_boxes = sam_model.transform.apply_boxes_torch(boxes_xyxy.to(device), image.shape[:2])
        masks, _, _ = sam_model.predict_torch(
            point_coords = None,
            point_labels = None,
            boxes = transformed_boxes,
            multimask_output = False,
            )
        return masks.cpu()
    def draw_mask(mask, image):
        color = np.concatenate([np.random.random(3), np.array([0.8])], axis=0)
        h, w = mask.shape[-2:]
        mask_image = mask.reshape(h, w, 1) * color.reshape(1, 1, -1)

        annotated_frame_pil = Image.fromarray(image).convert("RGBA")
        mask_image_pil = Image.fromarray((mask_image.cpu().numpy() * 255).astype(np.uint8)).convert("RGBA")
        return np.array(Image.alpha_composite(annotated_frame_pil, mask_image_pil))
    print("Reached Draw_mask")
    def get_segmented_plants(sources, model, boxes, frames, names, path):
        masks = []
        for image, box, frame, name in zip(sources, boxes, frames, names):
            mask = segment(image,model,box)
            masks.append(mask)
        return masks
    canon_img_mask = get_segmented_plants(canon_img_sources, sam, canon_img_boxes, canon_img_frames, canon_names, canon_img_path)
    rpi_img_mask = get_segmented_plants(rpi_img_sources, sam, rpi_img_boxes, rpi_img_frames, rpi_names, rpi_img_path)
    def contrast_segment(im):
        in_min = np.percentile(im, 5)
        in_max = np.percentile(im, 95)
        out_min = 0.0
        out_max = 255.0
        out = im - in_min
        out *= ((out_max - out_min) / (in_max - in_min))
        out += out_min
        return out.astype(np.uint8)
    contrasted = contrast_segment(imgs)
    print(contrasted)
    # x, y = mask.shape
    # for i in range(x):
    #     for j in range(y):
    #         if(mask[i][j]):
    #             imgc[i][j] = contrasted[i][j]
    #     print(imgc)
    return HttpResponse("Done")

    