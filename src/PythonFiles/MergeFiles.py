import os

def merge_files_to_single_folder(root_directory):
    # Define the output directory path
    output_dir = os.path.join(root_directory, "merged_files")
    os.makedirs(output_dir, exist_ok=True)

    for dirpath, _, filenames in os.walk(root_directory):
        # Skip the output directory itself to prevent recursion
        if os.path.abspath(dirpath) == os.path.abspath(output_dir):
            continue

        # Ask the user whether to process this directory
        print(f"\nFound directory: {dirpath}")
        choice = input("Do you want to merge files in this directory? (y/n): ").strip().lower()
        if choice != 'y':
            print("Skipping this directory.")
            continue

        # Determine a unique name for the output file based on the directory path
        relative_path = os.path.relpath(dirpath, root_directory)
        if relative_path == ".":
            output_file_name = "root_merged.txt"
        else:
            sanitized_path = relative_path.replace(os.sep, "_")
            output_file_name = f"{sanitized_path}_merged.txt"

        output_file_path = os.path.join(output_dir, output_file_name)

        try:
            with open(output_file_path, 'w', encoding='utf-8') as outfile:
                for filename in filenames:
                    file_path = os.path.join(dirpath, filename)
                    if not os.path.isfile(file_path):
                        continue
                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(f"--- Contents of {filename} ---\n")
                            outfile.write(infile.read())
                            outfile.write("\n\n")
                    except Exception as e:
                        print(f"Error reading file {file_path}: {e}")
            print(f"Merged files in '{dirpath}' into '{output_file_path}'")
        except Exception as e:
            print(f"Error writing to file {output_file_path}: {e}")

# --- Main Execution ---
if __name__ == "__main__":
    directory = input("Enter the root directory path: ").strip()
    if os.path.isdir(directory):
        merge_files_to_single_folder(directory)
    else:
        print("Error: The provided path is not a valid directory.")
