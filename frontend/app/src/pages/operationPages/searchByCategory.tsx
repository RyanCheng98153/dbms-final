import React, { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { CategoryContext } from "../../components/shareContext";

const initialBookState = {
    id: 0,
    time_stamp: new Date(),
    book_id: 0,
    book_page: 0,
    note: "",
  };

const categoryOptions = [
    '請選擇類別',
    '文學',
    '科學',
    '歷史',
    '哲學',
    '社會學',
    '西洋文學',
    '中國文學',
    '科幻',
    '奇幻'
]
  
const SearchCategory: React.FC = () => {
    // const [category, setCategory] = useState<string>('')
    const [masterCategory, setMasterCategory] = useState<string[]>(categoryOptions)
    const [searchInput, setSearchInput] = useState<string>('');

    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const context = useContext(CategoryContext);
    if(!context){
        throw new Error('MyContext must be used within a MyProvider')
    } const { category, setCategory } = context;

    const handleOptionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSearchInput(value);
    };
  
    const handleSelectCategory = (selectCategory: string) => {
      setSearchInput(selectCategory);
      setDropdownOpen(false)
    };
    
    const handleBtnClick = () => {
      setCategory(searchInput)
      if(searchInput == '請選擇類別'){
        setCategory('')
      }
      setDropdownOpen(false)
    };
  
    return (
      <Container>
        <Title>按分類搜尋</Title>
        <Label>選擇分類</Label>
        <Input
          type="text"
          name="title"
          value={searchInput}
          onClick={()=>{setDropdownOpen(true)}}
          //onBlur={() => {setDropdownOpen(false)}} // Close dropdown on blur
          //onFocus={() => setDropdownOpen(true)} // Open dropdown on focus
          onChange={handleOptionSelect}
          placeholder="請選擇類別"
          readOnly
        />
        {dropdownOpen && (
          <Dropdown>
            <DropdownList maxHeight={200}> {/* Adjust maxHeight as needed */}
              {masterCategory.map((category) => (
                <Option key={category} onClick={() => handleSelectCategory(category)}>
                  {category}
                </Option>
              ))}
            </DropdownList>
          </Dropdown>
        )}
        
        <Button onClick={handleBtnClick}>提交</Button>
      </Container>
    );
  };
  
  
  const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    margin-top: 40px;
    margin-bottom: 20px;
    padding: 40px;
    padding-top: 20px;
    border-radius: 20px;
    background: #f0f0e0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: "Arial", sans-serif;
    color: #333;
  `;
  
  const Title = styled.h2`
    margin-bottom: 30px;
    color: #333;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  `;
  
  const Label = styled.label`
    display: block;
    font-weight: bold;
    margin: 15px 0 5px;
    color: #555;
  `;
  
  const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
      outline: none;
    }
  `;
  
  const Button = styled.button`
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    background: linear-gradient(90deg, #ff7e5f, #feb47b);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  
    &:hover {
      background: linear-gradient(90deg, #feb47b, #ff7e5f);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    &:active {
      transform: translateY(0);
    }
  `;

  const Dropdown = styled.div`
    //position: absolute;
    //width: 500px;
    width: 100%;
    background-color: #f9f9f9;
    //z-index: 1;
  `;
  
  const DropdownList = styled.div<{ maxHeight: number }>`
    max-height: ${(props) => props.maxHeight}px;
    overflow-y: auto;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;
  
  const Option = styled.div`
    padding: 10px;
    cursor: pointer;
    //background-color: yellow;
    &:hover {
      background-color: #f1f1f1;
    }
  `;
  
export default SearchCategory;