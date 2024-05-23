import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import TextArea from "../../common/TextArea";
import Input from "../../common/Input";
import { Label } from "../Header/styles";
import Select from 'react-select'
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import { useState } from "react";

const Contact = ({ title, content, id, t }: ContactProps) => {
  const [priority, setPriority] = useState("")
  const [date, setDate] = useState("")
  const { values, errors, handleChange, handleSubmit, } = useForm(validate, priority, date);

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof typeof errors];
    return <Span>{ErrorMessage}</Span>;
  };



  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left" triggerOnce>
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right" triggerOnce>
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={values.title || ""}
                  onChange={handleChange}
                />
                <ValidationType type="title" />
              </Col>
              <Col span={24}>

                <TextArea type="text"
                  name="description"
                  placeholder="Description"
                  value={values.description || ""}
                  onChange={handleChange} />
                <ValidationType type="description" />
              </Col>
              <Col span={24}>

                <Label style={{ paddingBottom: 10, paddingTop: 10 }} >{t("Priority")}</Label>

                <Select onChange={(data: any) => setPriority(data.value)} defaultValue={values.priority} name="priority" options={[{ label: "low", value: "Low" }, { label: "Medium", value: "Medium" }, { label: "High", value: "High" }]} />
                <ValidationType type="priority" />
              </Col>

              <Col span={24}>
                <Label style={{ paddingBottom: 10, paddingTop: 10 }} >{t("Date")}</Label>
                <input value={date} onChange={(data) => setDate(data.target.value)} type="date" />
                <ValidationType type="description" />
              </Col>
              <ButtonContainer>
                <Button name="submit">{t("Submit")}</Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer >
  );
};

export default withTranslation()(Contact);
