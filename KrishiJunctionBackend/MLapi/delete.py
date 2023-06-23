# import pandas as pd
# import numpy as np

# # TODO: train price prediction from the dataset

# State = "Tamil Nadu"
# District = "Ariyalur"
# Mandi ="Andimadom"
# Crop = "Rice"


# prices = pd.read_csv("D:\hackathon\GFG\pricedata.csv")

# price = prices.loc[(prices['state']==State) &
#                 (prices['district']==District)&
#                 (prices['market']==Mandi) &
#                 (prices['commodity_name'] == Crop)]
# price = np.array(price["modal_price"])
# print(price)




import pandas as pd
import numpy as np
import datetime
from pycaret.regression import *

start_date = pd.to_datetime('2015-01-01')
end_date = pd.to_datetime('2022-12-01')

date_range = pd.date_range(start=start_date, end=end_date, freq='MS')

num_steps = len(date_range)

np.random.seed(42)  # Set a seed for reproducibility
nitrogen = np.random.uniform(0, 255, num_steps)
phosphorus = np.random.uniform(0, 255, num_steps)
potassium = np.random.uniform(0, 255, num_steps)
pH = np.random.uniform(0,14, num_steps)
dates = date_range
data = pd.DataFrame({
    'Date': dates,
    'Nitrogen': nitrogen,
    'Phosphorus': phosphorus,
    'Potassium': potassium,
    'pH': pH
})

seasons = []
for date in dates:
    month = date.month
    if month >= 4 and month <= 7:
        seasons.append('Kharif')
    elif month >= 10 or month <= 1:
        seasons.append('Rabi')
    else:
        seasons.append('Zaid')

data['CropSeason'] = seasons
data.to_csv('crop_nutrients_with_season.csv', index=False)

df = data