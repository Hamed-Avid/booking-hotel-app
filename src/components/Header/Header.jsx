import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutSideClick from "../../Hooks/useOutSideClick";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

export default function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const optionHandler = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="where to go?"
            className="headerSearchInput"
          />
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            id="dateDropDown"
            onClick={() => setOpenDate(!openDate)}
            className="dateDropDown"
          >
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateDropDown
              date={date}
              setDate={setDate}
              setOpenDate={setOpenDate}
            />
          )}
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              options={options}
              optionHandler={optionHandler}
              setOpenOptions={setOpenOptions}
            />
          )}
          <span className="separator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DateDropDown({ date, setDate, setOpenDate }) {
  const DateRef = useRef();
  useOutSideClick(DateRef, "dateDropDown", () => setOpenDate(false));

  return (
    <div ref={DateRef}>
      <DateRange
        ranges={date}
        className="date"
        minDate={new Date()}
        moveRangeOnFirstSelection={true}
        onChange={(item) => setDate([item.selection])}
      />
    </div>
  );
}

function GuestOptionList({ options, optionHandler, setOpenOptions }) {
  const optionsRef = useRef();
  useOutSideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

  const items = [
    { type: "adult", minLimit: "1" },
    { type: "children", minLimit: "0" },
    { type: "room", minLimit: "1" },
  ];

  return (
    <div className="guestOptions" ref={optionsRef}>
      {items.map((item) => (
        <OptionItem
          key={item.type}
          type={item.type}
          options={options}
          minLimit={item.minLimit}
          optionHandler={optionHandler}
        />
      ))}
    </div>
  );
}

function OptionItem({ options, type, minLimit, optionHandler }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => optionHandler(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => optionHandler(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
