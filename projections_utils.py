import csv
import os
from team_projection import DailyTeamProjection, TeamProjection
from utils import get_projections_storage_directory


def get_all_daily_projections():
    # get all file names from the written_data

    projections_storage_dir = get_projections_storage_directory()

    # get all the files in the directory that are csv files that look like team_projections_YYYY_MM_DD.csv

    projections_files = []

    for file in os.listdir(projections_storage_dir):
        if file.endswith(".csv") and file.startswith("team_projections_"):
            projections_files.append(file)

    daily_projections = []


    for file in projections_files:

        with open(os.path.join(projections_storage_dir, file), newline='') as csvfile:
            csvreader = csv.DictReader(csvfile)

            projections = []

            for row in csvreader:
                # get the date from the file name
                date_retrieved = row['date_retrieved']
                team_name = row['team_name']
                current_w = row['current_w']
                current_l = row['current_l']
                proj_w = row['proj_w']
                proj_l = row['proj_l']
                win_div = row['win_div']
                playoff = row['playoff']
                top6 = row['top6']
                playin = row['playin']
                proj_seed = row['proj_seed']
                proj_draft = row['proj_draft']
                first_pick = row['first_pick']

                projections.append(TeamProjection(date_retrieved, team_name, current_w, current_l, proj_w, proj_l, win_div, playoff, top6, playin, proj_seed, proj_draft, first_pick))

            date_retrieved = projections[0].date_retrieved

            daily_projections.append(DailyTeamProjection(date_retrieved, projections))

    daily_projections.sort(key=lambda x: x.date_retrieved)

    return daily_projections

def get_latest_daily_projection():
    all_daily_projections = get_all_daily_projections()

    latest_daily_projection = all_daily_projections[-1]

    return latest_daily_projection

def get_earliest_daily_projection():
    all_daily_projections = get_all_daily_projections()

    earliest_daily_projection = all_daily_projections[0]

    return earliest_daily_projection