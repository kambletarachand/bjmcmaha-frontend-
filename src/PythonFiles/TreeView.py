import os

def write_directory_tree(root_path, output_file, indent=""):
    try:
        entries = os.listdir(root_path)
    except FileNotFoundError:
        output_file.write(f"Error: The path '{root_path}' does not exist.\n")
        return
    except PermissionError:
        output_file.write(f"Error: Permission denied to access '{root_path}'.\n")
        return

    entries.sort()
    for i, entry in enumerate(entries):
        path = os.path.join(root_path, entry)
        is_last = (i == len(entries) - 1)
        connector = "└── " if is_last else "├── "
        output_file.write(indent + connector + entry + "\n")
        if os.path.isdir(path):
            extension = "    " if is_last else "│   "
            write_directory_tree(path, output_file, indent + extension)

# --- Main Execution ---
if __name__ == "__main__":
    directory = input("Enter directory path to print tree structure: ").strip()
    output_path = input("Enter output file path (e.g., tree_output.txt): ").strip()

    if os.path.exists(directory):
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(directory + "\n")
                write_directory_tree(directory, f)
            print(f"Directory tree has been written to '{output_path}'.")
        except Exception as e:
            print(f"Error writing to file: {e}")
    else:
        print("Error: The directory does not exist.")
