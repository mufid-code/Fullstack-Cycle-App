import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface TabsLayoutProps {
  title1: string;
  title2: string;
  userId: number;
  tabContent1: ReactNode;
  tabContent2: ReactNode;
}

export default function TabsLayout({
  title1,
  title2,
  userId,
  tabContent1,
  tabContent2,
}: TabsLayoutProps) {
  return (
    <Tabs variant="unstyled">
      <TabList
        borderBottom="1px solid"
        borderColor="tweet.gray"
      >
        <Tab
          w={'100%'}
          paddingY={3}
          textColor={'white'}
          fontWeight={500}
          fontSize={'16px'}
          lineHeight={'20px'}
          _selected={{
            position: 'relative',
            _after: {
              content: '""',
              position: 'absolute',
              width: '90%',
              height: '4px',
              bg: 'tweet.green',
              borderRadius: 'full',
              bottom: '-1px',
              left: '5%',
            },
          }}
        >
          {title1}
        </Tab>
        <Tab
          w={'100%'}
          paddingY={3}
          color={'white'}
          fontWeight={500}
          fontSize={'16px'}
          lineHeight={'20px'}
          _selected={{
            position: 'relative',
            _after: {
              content: '""',
              position: 'absolute',
              width: '90%',
              height: '4px',
              bg: 'tweet.green',
              borderRadius: 'full',
              bottom: '-1px',
              left: '5%',
            },
          }}
        >
          {title2}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          display={'flex'}
          flexDirection={'column'}
          gap={4}
        >
          <Link to={`/follows/${userId}`}>{tabContent1}</Link>
        </TabPanel>
        <TabPanel
          display={'flex'}
          flexDirection={'column'}
          gap={4}
        >
          <Link to={`/follows/${userId}`}>{tabContent2}</Link>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
