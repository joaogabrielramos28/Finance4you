import React from "react";
import {
  Text,
  VStack,
  Select as SelectNativeBase,
  Divider,
  Slider,
  Checkbox,
  useTheme,
  Avatar,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Select } from "@components/Select";
import { categories } from "@data/category";
import { FilterFormProps } from "./types";
import { useAuth } from "@context/Auth/AuthContext";
import { AvatarImage } from "@utils/AvatarImage";

export function FilterForm({
  category,
  value,
  showDateFilter,
  date,
  responsible,
  showResponsibleFilter,
  onChangeShowResponsibleFilter,
  onChangeResponsible,
  onChangeDate,
  onChangeShowDateFilter,
  onChangeCategory,
  onChangeMaxValue,
}: FilterFormProps) {
  const { colors } = useTheme();
  const { user, sharedUserNameList, hasAccountShared } = useAuth();
  return (
    <>
      <VStack px={4} mt={6} space={2}>
        <Text fontSize={"md"} color={"grayBrand.200"}>
          Categoria
        </Text>

        <Select
          selectedValue={category}
          onValueChange={(itemValue) => onChangeCategory(itemValue)}
        >
          <SelectNativeBase.Item label="Todas" value="all" />
          {categories.map((category) => (
            <SelectNativeBase.Item
              key={category.id}
              label={category.name}
              value={category.name}
            />
          ))}
        </Select>

        <Divider mt={2} bg={"grayBrand.500"} />
      </VStack>
      <VStack px={4} mt={6}>
        <Text fontSize={"md"} color={"grayBrand.200"}>
          Preço até : R$ {value}
        </Text>
        <Slider
          mt={2}
          w="full"
          maxW="full"
          defaultValue={0}
          value={value}
          maxValue={10000}
          onChange={onChangeMaxValue}
        >
          <Slider.Track>
            <Slider.FilledTrack bg={"violetBrand.400"} />
          </Slider.Track>
          <Slider.Thumb bg={"violetBrand.400"} />
        </Slider>
        <Divider mt={2} bg={"grayBrand.500"} />
      </VStack>
      <VStack px={4} mt={6} space={2}>
        <Checkbox
          onChange={(isSelected) =>
            onChangeShowDateFilter(isSelected ? "yes" : "no")
          }
          value="yes"
          isChecked={showDateFilter === "yes"}
          _text={{
            color: "grayBrand.200",
          }}
          _checked={{
            bg: "violetBrand.400",
            borderColor: "transparent",
          }}
          _pressed={{
            bg: "transparent",
            opacity: 0.5,
          }}
        >
          Filtrar por data
        </Checkbox>

        {showDateFilter === "yes" ? (
          <DateTimePicker
            accentColor={colors.violetBrand[400]}
            maximumDate={new Date()}
            themeVariant={"dark"}
            value={date}
            mode={"date"}
            locale={"pt-Br"}
            onChange={onChangeDate}
          />
        ) : null}
      </VStack>

      {hasAccountShared ? (
        <VStack px={4} mt={6} space={2}>
          <Checkbox
            onChange={(isSelected) =>
              onChangeShowResponsibleFilter(isSelected ? "yes" : "no")
            }
            value="yes"
            isChecked={showResponsibleFilter === "yes"}
            _text={{
              color: "grayBrand.200",
            }}
            _checked={{
              bg: "violetBrand.400",
              borderColor: "transparent",
            }}
            _pressed={{
              bg: "transparent",
              opacity: 0.5,
            }}
          >
            Filtrar por responsável
          </Checkbox>

          {showResponsibleFilter === "yes" ? (
            <Select
              padding={2}
              mt={2}
              onValueChange={onChangeResponsible}
              selectedValue={responsible}
            >
              <SelectNativeBase.Item
                startIcon={
                  <Avatar
                    size={"sm"}
                    source={{
                      uri: user?.photo!,
                    }}
                  />
                }
                label={user?.name!}
                value={user?.name!}
              />
              {sharedUserNameList.map((sharedUser) => (
                <SelectNativeBase.Item
                  key={sharedUser.id}
                  startIcon={
                    <Avatar
                      size={"sm"}
                      source={{
                        uri: AvatarImage(sharedUser.name),
                      }}
                    />
                  }
                  label={sharedUser.name}
                  value={sharedUser.name}
                />
              ))}
            </Select>
          ) : null}
        </VStack>
      ) : null}
    </>
  );
}
