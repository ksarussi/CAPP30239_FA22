# clean_wash post
import pandas as pd
with open('a3cleanedonly2015.json', encoding='utf-8') as inputfile:
    wash_data = pd.read_json(inputfile)

wash_data.to_csv('wash_df.csv', encoding='utf-8', index=False)

