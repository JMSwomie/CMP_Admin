import {
  Campaign,
  ForkRight,
  Logout,
} from '@mui/icons-material';

// Menu data

const links = [
  {
    id: 1,
    title: 'Admin',
    links: [
      {
        icon: <Campaign className="icon" />,
        name: 'Prompt',
      },
      {
        icon: <ForkRight className="icon" />,
        name: 'Routing',
      },
    ],
    
  },

  {
    id: 2,
    title: 'Config',
    links: [
      {
        icon: <Logout className="icon" />,
        name: 'Logout',
      },
    ],
  },
];

export { links };
