import pandas as pd

def make_csv(dta):
    '''
    Converts json object to csv with columns necessary for plotting.

    Inputs:
        dta (string) The json object to convert to csv

    Outputs:
        Writes to csv
    '''
    df = pd.read_json(dta)

    df.loc[df['Flee'] == True, 'Fled'] = 1
    df.loc[df['Flee'] == False, 'Fled'] = 0

    df.loc[df['Mental_illness'] == True, 'Illness'] = 1
    df.loc[df['Mental_illness'] == False, 'Illness'] = 0

    df.loc[df['Armed'] == '', 'Equipped'] = 0
    df.loc[df['Armed'] != '', 'Equipped'] = 1
    df.loc[df['Armed'] == 'Unarmed', 'Equipped'] = 0

    df.loc[df['Equipped'] == 0, 'Armed'] = False
    df.loc[df['Equipped'] == 1, 'Armed'] = True

    df["Ill_and_armed"] = df["Mental_illness"] & df["Armed"]

    # df.loc[df["Ill_and_armed"] == True, 'Ill_and_armed'] = 1
    # df.loc[df["Ill_and_armed"] == False, 'Ill_and_armed'] = 0

    df["Neither"] = (df['Equipped'] + df['Illness']) * 2
    df.loc[df["Neither"] == 0, 'Neither'] = True
    df.loc[df["Neither"] == 2, 'Neither'] = False
    df.loc[df["Neither"] == 4, 'Neither'] = False

    df.loc[df["Armed"] == True, 'Ill_v_armed'] = 'Armed'
    df.loc[df["Mental_illness"] == True, 'Ill_v_armed'] = 'Mentally ill'
    df.loc[df["Ill_and_armed"] == True, 'Ill_v_armed'] = 'Both'
    df.loc[df["Neither"] == True, 'Ill_v_armed'] = 'Neither'





    df.to_csv("data.csv", index=False)