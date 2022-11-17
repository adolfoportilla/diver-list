import { Form, Radio, Select } from "antd";
import { EQUIPMENT, EQUIPMENT_NAME_TO_DB_VALUE } from "../../../utils/supabase";

import EquipmentIconName from "../shared/EquipmentIconName";

export default function EquipmentForm(props) {
  return (
    <>
      <Form.Item
        label={
          <EquipmentIconName
            type={EQUIPMENT_NAME_TO_DB_VALUE.FINS}
            value="Fins"
          />
        }
        name={EQUIPMENT_NAME_TO_DB_VALUE.FINS}
        rules={[{ required: false }]}
      >
        <Select
          options={EQUIPMENT.FINS.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          className="w-20"
        />
      </Form.Item>
      <Form.Item
        label={
          <EquipmentIconName
            type={EQUIPMENT_NAME_TO_DB_VALUE.MASK}
            value="Mask"
          />
        }
        name={EQUIPMENT_NAME_TO_DB_VALUE.MASK}
        rules={[{ required: false }]}
      >
        <Radio.Group buttonStyle="solid">
          {EQUIPMENT.MASK.map((option) => (
            <Radio.Button key={option.value} value={option.value}>
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
          <EquipmentIconName
            type={EQUIPMENT_NAME_TO_DB_VALUE.WETSUIT}
            value="Wetsuit"
          />
        }
        name={EQUIPMENT_NAME_TO_DB_VALUE.WETSUIT}
        rules={[{ required: false }]}
      >
        <Radio.Group buttonStyle="solid">
          {EQUIPMENT.WETSUIT.map((option) => (
            <Radio.Button key={option.value} value={option.value}>
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
          <EquipmentIconName
            type={EQUIPMENT_NAME_TO_DB_VALUE.BCD}
            value="BCD"
          />
        }
        name={EQUIPMENT_NAME_TO_DB_VALUE.BCD}
        rules={[{ required: false }]}
      >
        <Radio.Group buttonStyle="solid">
          {EQUIPMENT.WETSUIT.map((option) => (
            <Radio.Button key={option.value} value={option.value}>
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
          <EquipmentIconName
            type={EQUIPMENT_NAME_TO_DB_VALUE.TANK}
            value="Tank"
          />
        }
        name={EQUIPMENT_NAME_TO_DB_VALUE.TANK}
        rules={[{ required: false }]}
      >
        <Radio.Group buttonStyle="solid">
          {EQUIPMENT.TANK.map((option) => (
            <Radio.Button key={option.value} value={option.value}>
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
          <EquipmentIconName
            type={EQUIPMENT_NAME_TO_DB_VALUE.REGULATOR}
            value="Regulator"
          />
        }
        name={EQUIPMENT_NAME_TO_DB_VALUE.REGULATOR}
        rules={[{ required: false }]}
      >
        <Radio.Group buttonStyle="solid">
          {EQUIPMENT.REGULATOR.map((option) => (
            <Radio.Button key={option.value} value={option.value}>
              {option.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  );
}
