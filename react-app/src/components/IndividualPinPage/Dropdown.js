import React from "react";
import "./BoardsListDropDown.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import OpenModalButton from '../OpenModalButton';
import CreateBoardFromPinModal from "./CreateBoardModal";

const Icon = () => {
  return (
    <button className="single-pin-ellipsis margin-right-15"><i class="fa-solid fa-chevron-down"></i></button>
  );
};

const Dropdown = ({ parentCallBack, placeHolder, options, isSearchable }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);


  useEffect(() => {
    const handler = () => setShowMenu(false)

    window.addEventListener("click", handler)

    return () => {
      window.removeEventListener("click", handler)
    }
  })

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter((option) => option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
  };

  const handleInputClick = (e) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  };
  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.label
    }
    return placeHolder;
  };

  const onItemClick = (option) => {
    setSelectedValue(option)
    parentCallBack(option.value)
  }

  const isSelected = (option) => {
    if (!selectedValue) {
      return false
    }
    return selectedValue.value === option.value
  }

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-board-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && <div className="dropdown-menu">
        {isSearchable && (
          <div className="search-box">
            <div className="search-function">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input onChange={onSearch} value={searchValue} ref={searchRef} />
            </div>
          </div>
        )}
        {getOptions().map((option) => (
          <div onClick={() => onItemClick(option)} key={option.value} className={`dropdown-item ${isSelected(option) && "selected"}`}>
            {option.label}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Dropdown;
