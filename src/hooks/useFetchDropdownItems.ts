import { useEffect, useState } from "react";
import axios from "axios";

type DropdownItem = {
  key: string;
  label: string;
};

const useFetchDropdownItems = () => {
  const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          "http://44.211.22.3:8000/api/models_available",
        );
        const models = response.data.models;
        const formattedItems = models.map((model: string) => ({
          key: `${model}`,
          label: model,
        }));
        setDropdownItems(formattedItems);
      } catch (error) {}
    };

    fetchModels();
  }, []);

  return dropdownItems;
};

export default useFetchDropdownItems;
