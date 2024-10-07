import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, Select, Button, Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
const { Option } = Select;

const DashBoard = () => {
  const [customer, setCustomer] = useState({}); // Initialize as empty object
  const [fields, setFields] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/fetchfields', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setFields(data);

        // Extract languages and countries from the data
        const languagesField = data.find(field => field.FieldName === 'CustomerLanguages');
        const countriesField = data.find(field => field.FieldName === 'CustomerCountry');

        if (languagesField && languagesField.Values) {
          setLanguages(languagesField.Values.split(','));
        }

        if (countriesField && countriesField.Values) {
          setCountries(countriesField.Values.split(','));
        }

        // Initialize customer state with fields dynamically
        const initialCustomerState = {};
        data.forEach(field => {
          initialCustomerState[field.FieldName] = ''; // Default value
        });
        setCustomer(initialCustomerState); // Set initial customer state
      } catch (error) {
        console.error('Error fetching fields:', error);
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchFields();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleMultiSelectChange = (value, fieldName) => {
    setCustomer((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/postCustomer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submitted_json: customer }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      resetForm(); // Reset form after successful submission
      toast.success(`Customer added successfully!`); 
    } catch (error) {
      console.error('Error submitting customer data:', error);
      toast.error('Error submitting customer data. Please try again.'); 
    }
  };

  const resetForm = () => {
    const resetCustomerState = {};
    fields.forEach(field => {
      resetCustomerState[field.FieldName] = ''; // Reset each field to empty string
    });
    setCustomer(resetCustomerState);
  };

  return (
    <div className="flex justify-center">
      <div className='max-w-md w-full space-y-8'>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Customer Information</h2>
        {loading ? ( // Show loader while fetching
          <div className="flex justify-center items-center">
            <Spin size="large" /> {/* Loader */}
          </div>
        ) : (
          <Form layout="vertical" onFinish={handleSubmit}>
            {fields.map((field) => {
              if (field.ControlType === 'TextBox') {
                return (
                  <Form.Item key={field.FieldName} label={field.FieldName}>
                    <Input
                      className='h-10 !rounded-xl shadow-lg'
                      name={field.FieldName}
                      placeholder={field.FieldName}
                      value={customer[field.FieldName] || ''}
                      onChange={handleChange}
                    />
                  </Form.Item>
                );
              }

              if (field.ControlType === 'RadioButton') {
                return (
                  <Form.Item key={field.FieldName} label={field.FieldName}>
                    <Radio.Group name={field.FieldName} value={customer[field.FieldName] || ""} onChange={handleChange}>
                      {field.Values.split(',').map((value) => (
                        <Radio key={value} value={value}>{value}</Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                );
              }

              if (field.ControlType === 'MultiDropDownList') {
                return (
                  <Form.Item key={field.FieldName} label={field.FieldName}>
                    <Select
                      className={`h-10 !rounded-xl shadow-lg`}
                      mode="multiple"
                      placeholder="Select languages"
                      value={customer[field.FieldName] || []} // Use empty array if undefined
                      onChange={(value) => handleMultiSelectChange(value, field.FieldName)} // Pass field name dynamically
                    >
                      {field.Values.split(',').map((language) => (
                        <Option key={language} value={language}>
                          {language}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                );
              }

              if (field.ControlType === 'DropDownList') {
                return (
                  <Form.Item key={field.FieldName} label={field.FieldName}>
                    <Select
                      className='h-10 !rounded-xl shadow-lg'
                      placeholder="Select"
                      value={customer[field.FieldName]}
                      onChange={(value) => setCustomer((prev) => ({ ...prev, [field.FieldName]: value }))}
                    >
                      <Option value="">Select</Option>
                      {field.Values.split(',').map((value) => (
                        <Option key={value} value={value}>
                          {value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                );
              }

              return null;
            })}

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
    </div>
  );
};

export default DashBoard;
