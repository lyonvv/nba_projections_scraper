
import csv

from over_under_pick import OverUnderPick
from team_over_under import TeamOverUnder

def get_over_under_picks():
    with open('initial_data/over_under_picks.csv', newline='') as csvfile:
        # Create a DictReader object
        csvreader = csv.DictReader(csvfile)

        over_under_picks = []

        # Loop through the rows in the CSV file
        for row in csvreader:
            team = row['Team']
            name = row['Name']
            pick = row['Pick']

            # Create an OverUnderPick object and append it to the list
            over_under_pick = OverUnderPick(team, name, pick)
            over_under_picks.append(over_under_pick)

        return over_under_picks
    
def get_team_over_unders():
    with open('initial_data/team_over_unders.csv', newline='') as csvfile:
        # Create a DictReader object
        csvreader = csv.DictReader(csvfile)

        team_over_unders = []

        # Loop through the rows in the CSV file
        for row in csvreader:
            team = row['Team']
            over_under = row['Line']

            # Create a TeamOverUnder object and append it to the list
            team_over_under = TeamOverUnder(team, over_under)
            team_over_unders.append(team_over_under)

        return team_over_unders