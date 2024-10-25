import os

def get_projections_storage_directory():
    if os.path.exists("/mnt/external"):
        return "/mnt/external/projections"
    else:
        print("Volume not mounted at /mnt/external. Saving to the regular project directory instead.")
        # Fallback to the regular project directory if the volume is not mounted
        return "written_data"
