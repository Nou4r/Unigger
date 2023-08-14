# Created using ChatGPT
import os
import re
import subprocess

# Get the absolute path of the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the version file using the script directory path
version_file_path = os.path.join(script_dir, 'version.txt')

# Read the current version number from the version file
with open(version_file_path, 'r') as f:
    current_version = int(f.read())

# Increment the version number
new_version = current_version + 1

# Write the new version number to the version file
with open(version_file_path, 'w') as f:
    f.write(str(new_version))
    f.write('\n')

# Use sed to replace the version number in HTML files
sed_command = f"find . -type f -name '*.html' -exec sed -i 's/\\?version=[0-9]*/?version={new_version}/g' {{}} +"
subprocess.run(sed_command, shell=True)

# Output the new version number for debugging purposes
print(f'New version: {new_version}')
