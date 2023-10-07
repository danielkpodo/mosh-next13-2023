import {
  Body,
  Container,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import React, { CSSProperties } from "react";

// the preview is the text the user sees once the email lands in the inbox
// Container is for centering our content
// We can pass props to to this template to render content dynamically

interface Props {
  name: string;
}

const WelcomeTemplate = ({ name }: Props) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Tailwind>
        <Body style={body}>
          <Container>
            <Text className="font-bold text-4xl text-red-500">
              Hello {name}
            </Text>
            <Link href="https://www.danielnarh.com">www.danielnarh.com</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const body: CSSProperties = {
  background: "#fff",
};

const heading: CSSProperties = {
  fontSize: "48px",
};

export default WelcomeTemplate;
