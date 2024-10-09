import { Avatar, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';

interface ItemPostProps {
  username: string;
  handle?: string;
  avatarUrl?: string;
  postTime: string;
  postContent: string;
  postImage?: string;
  children: React.ReactNode;
}
export default function ItemPost({
  username,
  handle,
  avatarUrl,
  postTime,
  postContent,
  postImage,
  children,
}: ItemPostProps) {
  return (
    <Flex
      gap="16px"
      py="16px"
      px="20px"
      borderBottom="1px"
      justifyContent="start"
      borderColor="#3F3F3F"
    >
      <Avatar
        borderRadius="full"
        mt="4"
        src={avatarUrl}
        boxSize="40px"
        objectFit="cover"
      />
      <Stack gap="8px">
        <Flex
          gap="4px"
          fontSize="14px"
        >
          <Text
            as="span"
            fontWeight="bold"
          >
            {username}
          </Text>
          <Text
            as="span"
            color="tweet.gray"
          >
            @{handle}
          </Text>
          <Text
            as="span"
            color="tweet.gray"
          >
            •
          </Text>
          <Text
            as="span"
            color="tweet.gray"
          >
            {postTime}
          </Text>
        </Flex>
        <Text
          as="p"
          fontSize="14px"
          lineHeight="20px"
        >
          {postContent}
        </Text>
        <Image
          src={postImage}
          width={'400px'}
          rounded={8}
        />
        <HStack gap="8px">{children}</HStack>
      </Stack>
    </Flex>
  );
}
