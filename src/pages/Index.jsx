import React, { useState } from "react";
import { Container, VStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { FaUpload, FaSearch } from "react-icons/fa";

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState({});

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const data = text.split("\n").map((row) => row.split(","));
      setCsvData(data);
    };
    reader.readAsText(file);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleQuantityChange = (medicine, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      [medicine]: quantity,
    }));
  };

  const filteredData = csvData.filter(([medicine]) => medicine.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container centerContent maxW="container.lg" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input type="file" accept=".csv" onChange={handleFileUpload} />
          <IconButton aria-label="Upload CSV" icon={<FaUpload />} />
        </HStack>
        <Input placeholder="Search for medicine..." value={searchTerm} onChange={handleSearch} />
        <IconButton aria-label="Search" icon={<FaSearch />} />
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Medicine</Th>
              <Th>Stock</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map(([medicine, stock, price], index) => (
              <Tr key={index}>
                <Td>{medicine}</Td>
                <Td>{stock}</Td>
                <Td>{price}</Td>
                <Td>
                  <NumberInput min={0} max={stock} value={cart[medicine] || 0} onChange={(valueString) => handleQuantityChange(medicine, valueString)}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button colorScheme="teal" size="lg">
          Place Order
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
