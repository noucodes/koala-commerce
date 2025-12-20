import { useState, useMemo } from "react";

interface Product {
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      selectedOptions: { name: string; value: string }[];
    }[];
  };
  options: { name: string; values: string[] }[];
}

type OptionValue = {
  value: string;
  selected: boolean;
  disabled: boolean;
};

type Option = {
  name: string;
  values: OptionValue[];
};

export function useVariantSelector(product: Product) {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

  const options: Option[] = useMemo(() => {
    // Get available values for an option based on current selections
    const getAvailableValues = (optionName: string): Set<string> => {
      const optionIndex = product.options.findIndex((opt) => opt.name === optionName);
      const priorSelections = product.options
        .slice(0, optionIndex)
        .map((opt) => ({ name: opt.name, value: selectedValues[opt.name] }))
        .filter((sel) => sel.value);

      const matchingVariants = product.variants.nodes.filter((variant) =>
        priorSelections.every((sel) =>
          variant.selectedOptions.some((vo) => vo.name === sel.name && vo.value === sel.value),
        ),
      );

      return new Set(
        matchingVariants.flatMap((v) => v.selectedOptions.filter((so) => so.name === optionName).map((so) => so.value)),
      );
    };

    return product.options.map((option, index) => ({
      name: option.name,
      values: option.values.map((value) => {
        const availableValues = getAvailableValues(option.name);
        return {
          value,
          selected: selectedValues[option.name] === value,
          disabled: index > 0 && !availableValues.has(value),
        };
      }),
    }));
  }, [selectedValues, product]);

  // Find matching variant
  const variantId = useMemo(() => {
    const allSelected = product.options.every((opt) => selectedValues[opt.name]);
    if (!allSelected) return null;

    const variant = product.variants.nodes.find(
      (v) => v.availableForSale && v.selectedOptions.every((so) => selectedValues[so.name] === so.value),
    );
    return variant?.id || null;
  }, [selectedValues, product]);

  const selectOption = (name: string, value: string) => {
    const optionIndex = product.options.findIndex((opt) => opt.name === name);

    // Clear dependent options
    const newSelections = { ...selectedValues, [name]: value };
    product.options.slice(optionIndex + 1).forEach((opt) => {
      delete newSelections[opt.name];
    });

    setSelectedValues(newSelections);
  };

  return { variantId, options, selectOption };
}
