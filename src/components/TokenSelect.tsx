import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { Backdrop } from "@mui/material";
import Image from "next/image";
import useTicker from "@/hooks/useTicker";

interface TokenSelectProps {
  tokenPrice: number;
  updateTokenPrice: (value: number) => void;
}

export interface SimpleDialogProps {
  list: { symbol: string; price: string }[];
  open: boolean;
  selectedValue: number;
  onClose: () => void;
  onSelect: (value: number) => void;
}

const SimpleDialog = (props: SimpleDialogProps) => {
  const { onSelect, onClose, selectedValue, open, list } = props;
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: number) => {
    onSelect(value);
  };

  return (
    <Backdrop onClick={handleClose} open={open}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <List className="bg-[#181627] overflow-y-scroll overflow-x-hidden h-1/2 text-white rounded-xl p-4">
        {list?.map(({ symbol }, idx) => (
          <ListItem
            key={idx}
            secondaryAction={
              idx === selectedValue && (
                <Image
                  src="/tickmark.svg"
                  alt="checked"
                  // className="dark:invert"
                  width={30}
                  height={15}
                />
              )
            }
          >
            <ListItemButton
              onClick={() => handleListItemClick(idx)}
              key={symbol}
            >
              {/* <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar> */}
              <ListItemText primary={symbol} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Backdrop>
  );
};

export const TokenSelect = (props: TokenSelectProps) => {
  const { updateTokenPrice } = props;
  const [open, setOpen] = useState(false);
  const priceList: { symbol: string; price: string }[] = useTicker();
  const [selectedValue, setSelectedValue] = useState(0);

  const toggleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = (value: number) => {
    setOpen(false);
    console.log(value);
    setSelectedValue(value);
    updateTokenPrice(parseFloat(priceList[value].price));
  };

  return (
    <>
      <Button
        onClick={toggleClickOpen}
        className="w-full text-white flex justify-between items-center rounded-xl bg-[#181627]"
        variant="text"
      >
        <div>{priceList[selectedValue]?.symbol}</div>
        <span className="rotate-180 px-2 flex justify-center items-center">
          ^
        </span>
      </Button>
      <SimpleDialog
        list={priceList}
        selectedValue={selectedValue}
        open={open}
        onClose={toggleClickOpen}
        onSelect={handleClose}
      />
    </>
  );
};
