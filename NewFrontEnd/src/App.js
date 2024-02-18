import React, { useState, useEffect } from "react";
import jsonToPlantUML from "json-to-plantuml";
import * as plantumlEncoder from 'plantuml-encoder';

const App = () => {
  const [plantUml, setPlantUml] = useState("");
  const [plantUmlSvgUrl, setPlantUmlSvgUrl] = useState("");

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

  return (
    <div>
      <h1>JSON to PlantUML</h1>
      <pre>{plantUml}</pre>
      <img alt="PlantUML" src={plantUmlSvgUrl} />
    </div>
  );
};

export default App;
