import React, { useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Icons } from "../../icons";

type SearchInputProps = {
  setFilteredConversations: React.Dispatch<React.SetStateAction<any>>;
  conversations: any;
};

const SearchInput: React.FC<SearchInputProps> = ({
  setFilteredConversations,
  conversations,
}) => {
  const [filter, setFilter] = useState("");
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleWrapperFocus = useCallback(() => {
    setIsFocused(true);
    inputRef.current?.focus();
  }, []);

  const handleWrapperBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
    },
    []
  );

  const handleRemoveFilter = useCallback(() => {
    setFilter("");
  }, []);

  const handlFilterConversation = () => {
    let value = filter.toLowerCase();
    const regex = new RegExp(`^${value?.trim()}`, "i");
    const filteredConversations = value
      ? conversations?.filter((el: any) => regex.test(el.name.toLowerCase()))
      : conversations;
    setFilteredConversations(filteredConversations);
  };

  const debounce = useDebounce({ func: handlFilterConversation, delay: 300 });

  useEffect(() => {
    if (filter) {
      debounce();
    }
  }, [filter]);

  return (
    <div
      tabIndex={0}
      onFocus={handleWrapperFocus}
      onBlur={handleWrapperBlur}
      className={`flex items-center gap-2 border rounded-md px-2 
        transition-shadow duration-200
        ${isFocused ? "ring-2 ring-btn-primary/70" : "ring-0"}`}
    >
      <Icons.MagnifyingGlassIcon className="w-5 text-gray-500" />
      <input
        ref={inputRef}
        placeholder="Search"
        tabIndex={-1} // prevent tab focusing the input before wrapper
        className="h-10 flex-1 border-none outline-none bg-transparent"
        value={filter}
        onChange={handleFilterChange}
      />
      {filter && (
        <Icons.XMarkIcon
          onClick={handleRemoveFilter}
          className="w-5 text-gray-500 cursor-pointer"
        />
      )}
    </div>
  );
};

export default React.memo(SearchInput);
