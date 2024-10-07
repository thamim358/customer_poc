import json
import os
from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

@app.route('/api/fetchfields', methods=['GET'])
def get_customers():
    # Load data from the Excel file
    df = pd.read_excel('customer_data.xlsx')
    
    # Convert the DataFrame to a dictionary
    fields = []
    for _, row in df.iterrows():
        values = row['Values']
        
        # Create a field dictionary with Values only if it is not 'null' or empty
        field_dict = {
            "FieldName": row['FieldName'],
            "ControlType": row['ControlType'],
        }
        
        # Only include 'Values' if it is not None, empty, or 'null'
        if values and str(values).lower() != 'nan':
            print("values",values)
            field_dict["Values"] = values

        fields.append(field_dict)

    return jsonify(fields)


@app.route('/api/postCustomer', methods=['POST'])
def save_customer_data_to_excel():
    try:
        data = request.get_json()
        submitted_json = data.get('submitted_json')
        excel_file = 'customer_entry.xlsx'

        # Check if the Excel file exists; if not, create it
        if not os.path.exists(excel_file):
            # Create a new DataFrame with 'ID' and 'Data' columns
            df = pd.DataFrame(columns=['ID', 'Data'])
        else:
            # Load the existing Excel file
            df = pd.read_excel(excel_file)

        # Get the last ID and increment by 1
        if not df.empty:
            last_id = df['ID'].max()
        else:
            last_id = 0

        new_id = int(last_id + 1)  # Convert to native Python int

        # Create a new row as a DataFrame
        new_row = pd.DataFrame({
            'ID': [new_id],  # Incremented ID
            'Data': [json.dumps(submitted_json)]  # Convert the JSON dict to a string for storage
        })

        # Concatenate the new row to the existing DataFrame
        df = pd.concat([df, new_row], ignore_index=True)

        # Write the updated DataFrame back to the Excel file
        df.to_excel(excel_file, index=False)

        return jsonify({"new_id": new_id}), 200  # Return the new ID as a JSON response
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

if __name__ == '__main__':
    app.run(debug=True)

