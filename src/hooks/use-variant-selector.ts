import { useState } from "react";
import { uniq, isEqual } from "es-toolkit";

interface Product {
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      selectedOptions: {
        name: string;
        value: string;
      }[];
    }[];
  };
  options: {
    name: string;
    values: string[];
  }[];
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

type Options = Option[];

type SelectedOption = {
  name: string;
  value: string | undefined;
};

function transformOptions(options: Product["options"]): Options {
  return options.map((option, optionIndex) => {
    const { name, values } = option;
    return {
      name,
      values: values.map((value) => ({
        value,
        selected: false,
        disabled: optionIndex === 0 ? false : true,
      })),
    };
  });
}

function getAvailableValues(variants: Product["variants"], draftOptions: Options, currentIndex: number): string[] {
  const selectedOptions: SelectedOption[] = draftOptions
    .map(({ name, values }) => ({
      name,
      value: values.find(({ selected }) => selected)?.value,
    }))
    .filter((_, index) => index < currentIndex);

  const availableVariants = variants.nodes.filter((variant) => {
    const conditions = selectedOptions.map(
      (selectedOption) =>
        !!variant.selectedOptions.find(
          ({ name, value }) => name === selectedOption.name && value === selectedOption.value,
        ),
    );
    return !conditions.includes(false);
  });

  const nextValues: string[] = [];
  availableVariants.forEach(({ selectedOptions }) => {
    selectedOptions.forEach((selectedOption) => {
      if (draftOptions[currentIndex].name === selectedOption.name) {
        nextValues.push(selectedOption.value);
      }
    });
  });

  return uniq(nextValues);
}

export function useVariantSelector(product: Product) {
  const [variantId, setVariantId] = useState<string | null>(null);
  const [options, setOptions] = useState<Options>(transformOptions(product.options));

  function selectOption(name: string, value: string): void {
    const draftOptions: Options = JSON.parse(JSON.stringify(options));
    const currentOptionIndex = draftOptions.findIndex((draftOption) => draftOption.name === name);

    draftOptions.forEach((draftOption, optionIndex) => {
      const availableValues = getAvailableValues(product.variants, draftOptions, optionIndex);

      draftOption.values.forEach((draftValue) => {
        if (availableValues.includes(draftValue.value)) {
          draftValue.disabled = false;
        } else {
          draftValue.disabled = true;
        }

        // Select current value
        if (optionIndex === currentOptionIndex) {
          draftValue.selected = false;
          if (draftValue.value === value) {
            draftValue.selected = true;
          }
        }

        // Clear dependent options
        if (optionIndex > currentOptionIndex) {
          draftValue.selected = false;
        }

        if (optionIndex > currentOptionIndex + 1) {
          draftValue.disabled = true;
        }
      });
    });

    const selectedOptions = draftOptions
      .map(({ name, values }) => ({
        name,
        value: values.find(({ selected }) => selected)?.value,
      }))
      .filter(({ value }) => value !== undefined) as {
      name: string;
      value: string;
    }[];

    const matchedVariant = product.variants.nodes.find(
      (variant) => variant.availableForSale && isEqual(variant.selectedOptions, selectedOptions),
    );

    const newVariantId = matchedVariant?.id || null;

    setVariantId(newVariantId);
    setOptions(draftOptions);
  }

  return {
    variantId,
    options,
    selectOption,
  };
}
