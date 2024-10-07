import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, Select, Button, Spin , Row, Col } from 'antd';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
const { Option } = Select;

const DashBoard = () => {
  const [customer, setCustomer] = useState({
    CustomerName: '',
    CustomerEmail: '',
    CustomerPhone: '',
    CustomerGender: '',
    CustomerLanguages: [],
    CustomerCountry: ''
  });

  const [fields, setFields] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [genders] = useState(['Male', 'Female']); // Static for simplicity
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

  const handleMultiSelectChange = (value) => {
    setCustomer((prev) => ({ ...prev, CustomerLanguages: value }));
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
      setCustomer({
        CustomerName: '',
        CustomerEmail: '',
        CustomerPhone: '',
        CustomerGender: '',
        CustomerLanguages: [],
        CustomerCountry: ''
      });
      toast.success(`Customer added successfully!`); 
    } catch (error) {
      console.error('Error submitting customer data:', error);
      toast.error('Error submitting customer data. Please try again.'); 
    }
  };

console.log("customer.CustomerLanguages",customer.CustomerLanguages)
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

          if (field.ControlType === 'RadioButton' && field.FieldName === 'CustomerGender') {
            return (
              <Form.Item key={field.FieldName} label="Customer Gender">
                <Radio.Group name="CustomerGender" value={customer.CustomerGender} onChange={handleChange}>
                  {genders.map((gender) => (
                    <Radio key={gender} value={gender}>{gender}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            );
          }

          if (field.ControlType === 'MultiDropDownList' && field.FieldName === 'CustomerLanguages') {
            return (
              <Form.Item key={field.FieldName} label="Customer Languages">
                <Select
                  className={`h-10 !rounded-xl shadow-lg`}
                  mode="multiple"
                  placeholder="Select languages"
                  value={customer.CustomerLanguages}
                  onChange={handleMultiSelectChange}
                >
                  {languages.map((language) => (
                    <Option key={language} value={language}>
                      {language}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            );
          }

          if (field.ControlType === 'DropDownList' && field.FieldName === 'CustomerCountry') {
            return (
              <Form.Item key={field.FieldName} label="Customer Country">
                <Select
                  className='h-10 !rounded-xl shadow-lg'
                  placeholder="Select country"
                  value={customer.CustomerCountry}
                  onChange={(value) => setCustomer((prev) => ({ ...prev, CustomerCountry: value }))}
                >
                  <Option value="">Select</Option>
                  {countries.map((country) => (
                    <Option key={country} value={country}>
                      {country}
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
