import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { List } from 'react-window';
import './Dropdown.css';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  isOpen: externalIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState(null);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = useCallback(
    (value) => {
      if (externalIsOpen === undefined) {
        setInternalIsOpen(value);
      }
      if (onOpenChange) {
        onOpenChange(value);
      }
    },
    [externalIsOpen, onOpenChange]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);
      const clickedInsideMenu = menuRef.current && menuRef.current.contains(event.target);
      if (!clickedInsideDropdown && !clickedInsideMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  useLayoutEffect(() => {
    if (isOpen && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      setMenuStyle({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    } else {
      setMenuStyle(null);
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (option) => {
      onChange(option);
      setIsOpen(false);
    },
    [onChange, setIsOpen]
  );

  const selectedOption = options.find(option => option.value === value);

  // Define RowComponent for react-window List
  const RowComponent = useMemo(() => ({ index, style }) => {
    const option = options[index];
    if (!option) return null;

    return (
      <div style={style} key={`${option.value}-${index}`}>
        <div
          className={`dropdown-item ${option.value === value ? 'selected' : ''}`}
          onClick={() => handleSelect(option)}
          role="option"
          aria-selected={option.value === value}
        >
          {option.customLabel || option.label}
        </div>
      </div>
    );
  }, [options, value, handleSelect]);

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${className}`}
    >
      <button
        type="button"
        ref={toggleRef}
        className={`dropdown-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => {
          !disabled && setIsOpen(!isOpen);
        }}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="dropdown-value">
          {selectedOption ? (selectedOption.customLabel || selectedOption.label) : placeholder}
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && menuStyle && createPortal(
        <div
          ref={menuRef}
          className="dropdown-menu"
          role="listbox"
          style={{
            position: 'absolute',
            top: menuStyle.top + 'px',
            left: menuStyle.left + 'px',
            width: menuStyle.width + 'px',
            zIndex: 9999
          }}
        >
          {options.length > 80 ? (
            <List
              defaultHeight={Math.min(400, options.length * 48)}
              rowCount={options.length}
              rowHeight={48}
              rowProps={{}}
              rowComponent={RowComponent}
              width={menuStyle.width}
              style={{ outline: 'none' }}
            />
          ) : (
            <ul style={{ margin: 0, padding: 0 }}>
              {options.map((option, idx) => (
                <li
                  key={`${option.value}-${idx}`}
                  className={`dropdown-item ${option.value === value ? 'selected' : ''}`}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={option.value === value}
                >
                  {option.customLabel || option.label}
                </li>
              ))}
            </ul>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default Dropdown;