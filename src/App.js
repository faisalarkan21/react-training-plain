import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Menu,
  Dropdown,
  Icon
} from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import "./App.css";
import { ConfirmModal } from "./components/modal-confirm";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      dataUsers: [],
      dataPosts: [],
      id: "",
      modalDelete: false,
      addUser: false,
      name: "",
      email: "",
      date: "",
      modalState: "",
      editUser: false
    };
  }

  // componentWillMount() {
  //   console.log("componentWillMount 1");
  // }

  componentDidMount() {
    this.handleFetchAll();
    // console.log("componentDidMount 2");
  }

  handleAddNumber = () => {
    this.setState({
      number: this.state.number + 1
    });
  };
  handleDecNumber = () => {
    this.setState({
      number: this.state.number - 1
    });
  };

  handleFetchAll = () => {
    Promise.all([
      axios
        .get("https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/photos")
        .then(({ data }) => data),
      axios
        .get("https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/users")
        .then(({ data }) => data)
    ])
      .then(data => {
        /**
         * @TODO
         * set State
         */

        this.setState({
          dataPosts: data[0],
          dataUsers: data[1]
        });

        // console.log("data-handleFetchAll", data);
      })
      .catch(err => console.error(err));
  };

  handleOk = () => {
    // console.log("id", this.state.id);
    const { id } = this.state;
    axios
      .delete(`https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/users/${id}`)
      .then(() => {
        alert("Berhasil simpan!");
        this.handleOpenModal();
      })
      .catch(err => {
        console.error("err", err);
      });
  };

  handleOpenModal = (id = "") => {
    this.setState(
      {
        modalDelete: !this.state.modalDelete,
        id
      },
      () => {
        this.handleFetchAll();
      }
    );
  };

  handleMenuClick = (e, id = "") => {
    if (e.key === "delete") {
      this.handleOpenModalDynamic("modalDelete");
    } else if (e.key === "edit") {
      this.handleOpenModalDynamic("edit");
    }
    this.setState({
      id
    });
  };

  handleOpenModalDynamic = (id, data) => {
    this.setState({
      [id]: !this.state[id]
    });
  };

  handleSubmit = () => {
    const { name, email, date, id } = this.state;

    const constructUserPost = {
      name,
      email,
      createdAt: date
    };

    if (this.state.addUser) {
      axios
        .post(
          `https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/users`,
          constructUserPost
        )
        .then(() => {
          alert("Berhasil simpan!");
          this.handleOpenModalDynamic("addUser");
        })
        .catch(err => {
          console.error("err", err);
        });
    } else {
      axios
        .put(
          `https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/users/${id}`,
          constructUserPost
        )
        .then(() => {
          alert("Berhasil simpan!");
          this.handleOpenModalDynamic("editUser");
        })
        .catch(err => {
          console.error("err", err);
        });
    }
  };

  handleOnChange = e => {
    console.log("value", e.target.value);
    const { inputType } = e.currentTarget.dataset;
    this.setState({
      [inputType]: e.target.value
    });
  };

  onChangeDate = (date, dateString) => {
    console.log(moment(date));
    this.setState({
      date: moment(date)
    });
  };

  render() {
    // console.log("render");
    return (
      <div className="container">
        <ConfirmModal
          title="Confirm Modal Delete"
          visible={this.state.modalDelete}
          onOk={this.handleOk}
          onCancel={() => this.handleOpenModalDynamic("modalDelete")}
        >
          Apakah anda yakin akan menghapus ?
        </ConfirmModal>
        <Modal
          visible={this.state.addUser || this.state.editUser}
          title={this.state.addUser ? "Tambah User" : "Edit User"}
          onCancel={() =>
            this.handleOpenModalDynamic(
              this.state.addUser ? "addUser" : "editUser"
            )
          }
          footer={[
            <Button
              key="back"
              onClick={() =>
                this.handleOpenModalDynamic(
                  this.state.addUser ? "addUser" : "editUser"
                )
              }
            >
              Cancel
            </Button>,
            <Button key="submit" onClick={this.handleSubmit} type="primary">
              Submit
            </Button>
          ]}
        >
          <Form.Item label="Name">
            <Input
              data-input-type="name"
              value={this.state.name}
              onChange={this.handleOnChange}
              placeholder="Basic usage"
            />
          </Form.Item>
          <Form.Item label={"Email"}>
            <Input
              data-input-type="email"
              value={this.state.email}
              onChange={this.handleOnChange}
              placeholder="Basic usage"
            />
          </Form.Item>
          <Form.Item label={"Date"}>
            {console.log("this.state.date", this.state.date)}
            {/* <DatePicker defaultValue={moment(this.state.date)} onChange={this.onChangeDate} /> */}
          </Form.Item>
        </Modal>
        <Row gutter={18}>
          <Col className="gutter-row">
            <Button
              style={{ marginBottom: 20 }}
              onClick={this.handleFetchAll}
              type="primary"
            >
              Fetch All Table
            </Button>
            <Button
              style={{ marginBottom: 20, marginLeft: 20 }}
              onClick={() => this.handleOpenModalDynamic("addUser")}
              type="primary"
            >
              Tambah Users
            </Button>
            <table>
              {this.state.dataUsers.length > 0 && (
                <thead className="ant-table-thead">
                  <tr>
                    <th className="ant-table-header-column">Created At</th>
                    <th className="ant-table-header-column">Name</th>
                    <th className="ant-table-header-column">Avatar</th>
                    <th className="ant-table-header-column">Email</th>
                    <th className="ant-table-header-column">Action</th>
                  </tr>
                </thead>
              )}
              {this.state.dataUsers.map(v => (
                <tr>
                  <td key={v.id}>{moment(v.createdAt).format("LLL")}</td>
                  <td>{v.name}</td>
                  <td>
                    <img
                      style={{ padding: 40 }}
                      src={v.avatar}
                      width={200}
                      height={200}
                    ></img>
                  </td>
                  <td>{v.email}</td>
                  <td>
                    <Dropdown
                      overlay={
                        <Menu onClick={e => this.handleMenuClick(e, v.id)}>
                          <Menu.Item key="delete">Delete</Menu.Item>
                          <Menu.Item key="edit">Edit</Menu.Item>
                        </Menu>
                      }
                    >
                      <Button>
                        Actions <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </table>
          </Col>
        </Row>
      </div>
    );
  }
}
export default App;
