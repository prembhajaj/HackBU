import React, { useState, useEffect } from 'react';
import jsonToPlantUML from "json-to-plantuml";
import * as plantumlEncoder from 'plantuml-encoder';

const JavaCodeUML = () => {
  const [javaCode, setJavaCode] = useState('');
  const [plantUml, setPlantUml] = useState("");
  const [plantUmlSvgUrl, setPlantUmlSvgUrl] = useState("");
  const [response, setResponse] = useState(null);

  const makeApiRequest = async () => {
    const apiUrl = 'https://api.openai.com/v1/completions';  // Replace with your actual API endpoint

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    };

    const requestBody = {
      model: 'gpt-3.5-turbo-instruct',
      prompt: `${javaCode}+ give me a brief text summarization of this code`,
      temperature: 0.7,
      max_tokens: 2500,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setResponse(responseData);
    } catch (error) {
      console.error('Error:', error.message);
      setResponse(null);
    }
  };

  console.log(response);


  useEffect(() => {
    const generatePlantUml = async () => {
      // Sample JSON data
      const sampleJson = {
        person: {
          name: "John Doe",
          age: 30,
          address: {
            street: "123 Main St",
            city: "Anytown",
            zipCode: "12345",
          },
          contacts: [
            {
              type: "email",
              value: "john@example.com",
            },
            {
              type: "phone",
              value: "+1234567890",
            },
          ],
        },
      };

      // Convert JSON to PlantUML
      try {
        const generatedPlantUml = await jsonToPlantUML(sampleJson);
        setPlantUml(generatedPlantUml);

        // Encode PlantUML code to get the SVG URL
        const encode = plantumlEncoder.encode(generatedPlantUml);
        const url = `http://www.plantuml.com/plantuml/svg/${encode}`;
        setPlantUmlSvgUrl(url);
      } catch (error) {
        console.error("Error generating PlantUML:", error);
        setPlantUml("Error generating PlantUML");
      }
    };

    // Call the async function
    generatePlantUml();
  }, []); // Empty dependency array to run the effect only once when the component mounts


  const handleInputChange = (event) => {
    setJavaCode(event.target.value);
  };

  const convertToBackendString = () => {
    // Your backend expects the Java code as a string, so you can use javaCode directly.
    console.log('Sending to backend:', javaCode);

    // For demonstration purposes, you can make a fetch request to your backend here.
    // Replace the URL and method with your actual backend API endpoint.
    // fetch('your-backend-api-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ javaCode }),
    // })
    //   .then(response => response.json())
    //   .then(data => console.log('Backend response:', data))
    //   .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <textarea
        rows="10"
        cols="80"
        placeholder="Enter Java code here..."
        value={javaCode}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={convertToBackendString}>Send to Backend</button>
      <br/>
      {javaCode?<div>{javaCode}</div>:null}
      {/*<img alt="PlantUML" src={plantUmlSvgUrl} />*/}

      <div>
      <button onClick={makeApiRequest}>Make API Request</button>
      {response && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
    </div>
  );
};

export default JavaCodeUML;
