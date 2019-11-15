import React from "react";
import { Select, Input, Form, Row, Col } from "antd";

const { Option } = Select;

class DynamicBank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countText: 0,
      dropdown: "",
      text: ""
    };
  }

  onChange = e => {
    // console.log('e', e.target.id, e.target.value)
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleChangeSelect = (id, value) => {
    // console.log(`selected ${value}`);
    this.setState({
      [id]: value
    });
  };

  renderText = () => {
    const tempComponent = [];
    for (let i = 0; i < this.state.countText; i++) {
      tempComponent.push(
        <div>
          <Form>
            <Row gutter={16}>
              <Col md={2} style={{ marginRight: 15 }}>
                <Select
                  defaultValue="Pilih Bank"
                  id={`dropdown${i}`}
                  data-
                  style={{ width: 120 }}
                  onChange={e => this.handleChangeSelect(`dropdown${i}`, e)}
                >
                  <Option value="bni">BNI</Option>
                  <Option value="bca">BCA</Option>
                </Select>
              </Col>
              <Col md={6}>
                <Input
                  id={`text${i}`}
                  onChange={this.onChange}
                  placeholder={ `${this.state[`dropdown${i}`]}` !== 'undefined' ? `No Rek ${this.state[`dropdown${i}`]}` : 'Pilih Bank'}
                ></Input>
                {console.log(`${this.state[`dropdown${i}`]}`)}
              </Col>
            </Row>
          </Form>
          <br />
        </div>
      );
    }
    // console.log("tempComponent", tempComponent);
    return tempComponent;
  };

  render() {
    return (
      <div style={{ padding: 30 }}>
        {this.renderText()}
        <button
          onClick={() => this.setState({ countText: this.state.countText + 1 })}
        >
          Tambah
        </button>
      </div>
    );
  }
}

export default DynamicBank;
