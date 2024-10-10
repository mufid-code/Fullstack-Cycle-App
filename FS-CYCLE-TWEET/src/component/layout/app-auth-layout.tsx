// components/Layout.tsx
import { Container, Stack, Image, Text } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout = ({ children, title }: LayoutProps) => (
  <Container
    maxW="container.base"
    mt="8rem"
    textColor="tweet.putih"
  >
    <Stack gap="16px">
      <Image
        src="https://res.cloudinary.com/dje40bx3b/image/upload/v1728317302/circle-image/pc6finzpiepopaudfwtf.png"
        alt="logo"
        w="108px"
      />
      <Text fontSize="3xl">{title}</Text>
      {children}
    </Stack>
  </Container>
);
