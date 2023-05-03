import { SideBar } from '../../pages/components/SideBar/SideBar';
export interface RootStateInterface {
  theme: {
    theme: string;
  };

  sideBar: {
    barShow: string;
  };

  sideBarSelect: {
    componentSelect: string;
  };

  // Add more Root States
}
