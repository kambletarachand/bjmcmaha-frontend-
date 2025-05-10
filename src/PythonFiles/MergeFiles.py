import os

def merge_files_in_directory(directory_path, output_file):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for filename in os.listdir(directory_path):
            file_path = os.path.join(directory_path, filename)
            if os.path.isfile(file_path):
                with open(file_path, 'r', encoding='utf-8') as infile:
                    outfile.write(f"--- Contents of {filename} ---\n")
                    outfile.write(infile.read() + "\n\n")

# Example usage
dir_path = input("Enter directory path to read files: ")
output_path = input("Enter output file path (e.g., merged.txt): ")
merge_files_in_directory(dir_path, output_path)
print("All files have been merged into", output_path)
