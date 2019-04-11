import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import ShowChart from '@material-ui/icons/ShowChart';
import BarChartIcon from '@material-ui/icons/BarChart';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <FormatListBulleted />
      </ListItemIcon>
      <ListItemText primary="Functions" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Store" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        {/* <BarChartIcon /> */}
        <ShowChart />
      </ListItemIcon>
      <ListItemText primary="Metrics" />
    </ListItem>
  </div>
);