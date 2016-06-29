import React from 'react';
import Section from './Section';
const Experience = (props) => {
  const section = props.section_names.experience;
  return (
    <Section section={section}>
      <dl></dl>
    </Section>
  );
};

export default Experience;
