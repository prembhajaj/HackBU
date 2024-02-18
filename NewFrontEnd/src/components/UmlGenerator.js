// UMLDiagramGenerator.js
import React, { useState } from 'react';
import json2uml from 'json2uml';
import UMLDiagram from 'react-uml-diagrams';

const UMLDiagramGenerator = ({ classData }) => {
  const [umlString, setUmlString] = useState('');

  const generateUML = (classData) => {
    const umlData = {
      class: classData.name,
      attributes: classData.attributes.map((attribute) => ({
        name: attribute.name,
        type: attribute.type,
        visibility: attribute.visibility,
      })),
    };
    const newUmlString = json2uml(umlData);
    setUmlString(newUmlString);
  };

  // Initial generation
  generateUML(classData);

  return (
    <div>
      <h2>Dynamic UML Diagram Generator</h2>
      {umlString && (
        <div>
          {/* Log the UML string for verification */}
          <pre>{umlString}</pre>
          {/* Render the UML diagram using react-uml-diagrams */}
          <UMLDiagram code={umlString} />
        </div>
      )}
    </div>
  );
};

export default UMLDiagramGenerator;
