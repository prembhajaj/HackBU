import React, { useState, useEffect } from 'react';
// import jsonToPlantUML from "json-to-plantuml";
import * as plantumlEncoder from 'plantuml-encoder';
import "../App.css";

const JavaCodeUML = () => {
  const [javaCode, setJavaCode] = useState('');
  const [plantUml, setPlantUml] = useState("");
  const [plantUmlSvgUrl, setPlantUmlSvgUrl] = useState("");
  const [response, setResponse] = useState(null);

  const makeApiRequest = async () => {
  
    const apiUrl = 'https://api.openai.com/v1/chat/completions';  // Replace with your actual API endpoint

    // const apiKey = process.env.OPENAI_API_KEY?.trim();
    // if (!apiKey) throw new Error("Missing OPENAI_API_KEY");
    const apiKey = "test"

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };

    const requestBody = {
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: "You summarize code succinctly and accurately." },
        { role: "user", content: `Summarize this code in 4–6 lines:\n\n${javaCode}` }
      ],
      temperature: 0.3,
      max_tokens: 400
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


  // useEffect(() => {


  //   // Call the async function
  //   generatePlantUml();
  // }, [javaCode]); // Run the effect whenever javaCode changes

  const generatePlantUml = async () => {
    // Call the backend API to generate PlantUML
    try {
      const response = await fetch('http://localhost:8080/generate-uml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/text',
        },
        // body: JSON.stringify(javaCode),
        body: javaCode,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const generatedPlantUml = await response.text();

      setResponse(generatedPlantUml);

      console.log("generatePlantUml", generatePlantUml);

      // Set the generated PlantUML and encode for SVG URL
      setPlantUml(generatedPlantUml);
      const encode = plantumlEncoder.encode(generatedPlantUml);
      const url = `http://www.plantuml.com/plantuml/svg/${encode}`;
      console.log(url);
      setPlantUmlSvgUrl(url);
    } catch (error) {
      console.error("Error generating PlantUML:", error);
      setPlantUml("Error generating PlantUML");
    }
  };

  console.log(javaCode);


  const handleInputChange = (event) => {
    setJavaCode(event.target.value);
  };



  return (
    <>
      <nav className="navbar navbar-light p-4 navbar-expand-lg" style={{ "backgroundColor": "#008000", "fontSize":"300px" }}>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light">Bing UML</span>
        </div>
      </nav>

      <div className="container-fluid">

        {/* Left Side */}
        <div className="row">
          {/* Left Half */}
          <div className="col-sm-6">
            <textarea
              className="form-control h-100"
              rows="30"
              placeholder="Enter Java code here..."
              value={javaCode}
              onChange={handleInputChange}
            />
            <div className='p-2 d-flex justify-content-center'>
              <button className="btn btn-primary" onClick={() => { generatePlantUml(); makeApiRequest(); }}>
                Refresh
              </button>
            </div>
          </div>
          {/* Right Side */}
          <div className="col-sm-6 border-bottom">
            <div className="row w-100 h-100">
              <div className="col-12">
                <div>
                  <h3>UML Diagram:</h3>
                  <div className="text-center">

                    {plantUmlSvgUrl ? <img className="img-fluid w-100 h-100 text-center" alt="" src={plantUmlSvgUrl} /> : null}
                  </div>
                </div>
              </div>
              <div className="col-1 d-flex align-items-center justify-content-center">
                <hr className="m-0" style={{ height: "100%" }} />
              </div>
              <div className="col-12 border-top">
                <div><h3 className='align-top my-10'>Code Summary:</h3></div>

                <div className='text-start'>
                  {response && response.choices && response.choices[0] && response.choices[0].text && (
                    <div style={{ whiteSpace: 'pre-line' }}>
                      <div>{JSON.stringify(response.choices[0].text.trim(), null, 2).replace(/"/g, '')}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*<div className="col-sm-6">
            
            <div className="d-flex flex-column justify-content-between h-100 border-top">
              
              <div>
                <h3>UML Diagram:</h3>
                <div className="mb-3 text-center">

                  {plantUmlSvgUrl ? <img className="img-fluid" alt="" src={plantUmlSvgUrl} /> : null}
                </div>
              </div>

              <div className='border'></div>

              
              <div  style={{ whiteSpace: 'pre-line' }} className='d-flex text-start border-bottom align-top'>
                <div><h3 className='align-top my-10'>Code Summary:</h3></div>

                <div className='text-start'>
                  {response && response.choices && response.choices[0] && response.choices[0].text && (
                    <div style={{ whiteSpace: 'pre-line' }}>
                      <pre>{JSON.stringify(response.choices[0].text.trim(), null, 2).replace(/"/g, '')}</pre>
                    </div>
                  )}
                </div>
              </div>


            </div>
                  </div>*/}
        </div>



      </div>
    </>
  );

};

export default JavaCodeUML;