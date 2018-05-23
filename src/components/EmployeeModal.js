import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import swal from 'sweetalert';
import styled from 'styled-components';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';
import IconUploadWhite from 'assets/icon_upload_white.svg';
import Placeholder from 'assets/placeholder.png';

import {
  ModalWrapper,
  ModalClose,
  ModalTitle,
  ModalContent,
  ModalInput,
  ModalImageInput,
  ModalSwitcher,
  ModalSubmit,
} from 'components/SharedElements';

import * as api from 'services/api';

export default class EmployeeModal extends Component {
  static propTypes = {
    supplier: PropTypes.array.isRequired,
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    data: PropTypes.object,
    create: PropTypes.bool,
  };

  static defaultProps = {
    data: {},
    create: false,
  };

  constructor(props) {
    super(props);

    const { create, data } = this.props;

    if (create) {
      this.state = {
        username: '',
        password: '',
        nama: '',
        foto: '',
        no_ktp: '',
        ktp: {
          no_ktp: '',
          alamat: '',
          tanggal_lahir: Moment()
            .format('YYYY-MM-DD')
            .toString(),
          tempat_lahir: '',
        },
        peran: 'picker',
        id_supplier: '',
        no_sim: '',
        sim: {
          no_sim: '',
          jenis_sim: '',
        },
        validation: {
          username: '',
          password: '',
          nama: '',
          foto: '',
          no_ktp: '',
          ktp: {
            no_ktp: '',
            alamat: '',
            tanggal_lahir: '',
            tempat_lahir: '',
          },
          peran: '',
          id_supplier: '',
          no_sim: '',
          sim: {
            no_sim: '',
            jenis_sim: '',
          },
        },
        uploading: false,
      };
    } else {
      this.state = {
        username: data.username,
        password: data.password ? data.password : '',
        nama: data.nama,
        foto: data.foto,
        no_ktp: data.no_ktp,
        ktp: {
          no_ktp: data.ktp.no_ktp,
          alamat: data.ktp.alamat,
          tanggal_lahir: Moment(data.ktp.tanggal_lahir)
            .format('YYYY-MM-DD')
            .toString(),
          tempat_lahir: data.ktp.tempat_lahir,
        },
        peran: data.peran,
        id_supplier: data.peran.toLowerCase() === 'picker' ? data.id_supplier : '',
        no_sim: data.peran.toLowerCase() === 'driver' ? data.no_sim : '',
        sim: {
          no_sim: data.peran.toLowerCase() === 'driver' ? data.sim.no_sim : '',
          jenis_sim: data.peran.toLowerCase() === 'driver' ? data.sim.jenis_sim : '',
        },
        validation: {
          username: '',
          password: '',
          nama: '',
          foto: '',
          no_ktp: '',
          ktp: {
            no_ktp: '',
            alamat: '',
            tanggal_lahir: '',
            tempat_lahir: '',
          },
          peran: 'picker',
          id_supplier: '',
          no_sim: '',
          sim: {
            no_sim: '',
            jenis_sim: '',
          },
        },
        uploading: false,
      };
    }
  }

  setInput = (field, value) => {
    this.setState({ [field]: value });
  };

  setNestedInput = (parent, child, value) => {
    this.setState({ [parent]: { ...this.state[parent], [child]: value } });
  };

  save = () => {
    if (this.validate()) {
      this.props.save(this.state);
      this.props.close();
    }
  };

  validate = () => {
    const validation = {
      username: '',
      password: '',
      nama: '',
      foto: '',
      no_ktp: '',
      ktp: {
        no_ktp: '',
        alamat: '',
        tanggal_lahir: '',
        tempat_lahir: '',
      },
      peran: 'picker',
      id_supplier: '',
      no_sim: '',
      sim: {
        no_sim: '',
        jenis_sim: '',
      },
    };

    let invalid = false;
    const numberRegExp = /^\d+$/;

    if (this.state.nama.length === 0) {
      validation.nama = 'Nama tidak boleh kosong';
      invalid = true;
    }

    if (this.state.foto.length <= 4 || !this.state.foto.startsWith('http')) {
      validation.foto = 'URL tidak valid';
      invalid = true;
    }

    if (this.state.username.length <= 6 && !numberRegExp.test(this.state.username)) {
      validation.username =
        'Nomor Telpon harus lebih panjang dari 8 karakter dan hanya terdiri dari angka';
      invalid = true;
    }

    if (this.state.password.length < 8) {
      validation.password = 'Password harus lebih dari 7 karakter';
      invalid = true;
    }

    if (this.state.no_ktp.length !== 16 || !numberRegExp.test(this.state.no_ktp)) {
      validation.no_ktp = 'Nomor KTP harus sepanjang 16 karakter dan hanya terdiri dari angka';
      invalid = true;
    }

    if (this.state.ktp.alamat.length === 0) {
      validation.ktp.alamat = 'Alamat tidak boleh kosong';
      invalid = true;
    }

    if (this.state.ktp.tempat_lahir.length === 0) {
      validation.ktp.tempat_lahir = 'Tempat lahir tidak boleh kosong';
      invalid = true;
    }

    if (this.state.ktp.tanggal_lahir.length === 0) {
      validation.ktp.tanggal_lahir = 'Tanggal lahir tidak boleh kosong';
      invalid = true;
    }

    if (this.state.peran.toLowerCase() === 'picker' && this.state.id_supplier.length === 0) {
      validation.id_supplier = 'Supplier tidak boleh kosong';
      invalid = true;
    }

    if (
      this.state.peran.toLowerCase() === 'driver' &&
      (this.state.no_sim.length !== 12 || !numberRegExp.test(this.state.no_sim))
    ) {
      validation.no_sim = 'Nomor SIM harus sepanjang 12 karakter dan hanya terdiri dari angka';
      invalid = true;
    }

    if (this.state.peran.toLowerCase() === 'driver' && this.state.sim.jenis_sim.length !== 1) {
      validation.sim.jenis_sim = 'Jenis SIM harus terdiri dari 1 huruf';
      invalid = true;
    }

    this.setState({ validation });
    return !invalid;
  };

  handleImageChange = async evt => {
    evt.preventDefault();

    if (evt.target.files.length > 0) {
      const image = evt.target.files[0];
      this.setState({ uploading: true });

      const result = await api.uploadImage(image);

      if (result.ok) {
        this.setState({ foto: result.body.secure_url });
      } else {
        swal({
          icon: 'error',
          title: 'Error Uploading Image',
          text: 'Terjadi kesalahan dalam pengunggahan gambar, silahkan coba lagi',
        });
      }

      this.setState({ uploading: false });
      this.profPicInput.value = '';
    }
  };

  render() {
    const { supplier, create, close } = this.props;

    return (
      <ModalWrapper>
        <ModalClose onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </ModalClose>
        <ModalTitle>{create ? 'Tambah Data Pegawai' : 'Ubah Data Pegawai'}</ModalTitle>
        <ModalContent>
          <h4>Semua Data Wajib Diisi</h4>
          <ModalInput>
            <span>Nama Lengkap</span>
            <input
              type="text"
              value={this.state.nama}
              onChange={evt => this.setInput('nama', evt.target.value)}
              placeholder="John Doe"
            />
            {this.state.validation.nama && <h6>{this.state.validation.nama}</h6>}
          </ModalInput>
          <ModalImageInput uploading={this.state.uploading}>
            <img src={this.state.foto ? this.state.foto : Placeholder} alt="profpic" />
            <div>
              <span>Profile Picture</span>
              <label disabled={this.state.uploading} htmlFor="employee-profile-pic">
                <img src={IconUploadWhite} alt="upload" />
                {this.state.uploading ? 'Mengunggah' : 'Gambar'}
                <input
                  ref={e => (this.profPicInput = e)}
                  type="file"
                  id="employee-profile-pic"
                  onChange={this.handleImageChange}
                  disabled={this.state.uploading}
                  accept="image/*"
                />
              </label>
              {this.state.validation.foto && <h6>{this.state.validation.foto}</h6>}
            </div>
          </ModalImageInput>
          <ModalInput>
            <span>Nomor Telpon</span>
            <input
              type="text"
              value={this.state.username}
              onChange={evt => this.setInput('username', evt.target.value)}
              placeholder="085XXXXXX..."
            />
            {this.state.validation.username && <h6>{this.state.validation.username}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Password</span>
            <input
              type="password"
              value={this.state.password}
              onChange={evt => this.setInput('password', evt.target.value)}
              placeholder="Password"
            />
            {this.state.validation.password && <h6>{this.state.validation.password}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Nomor KTP</span>
            <input
              type="text"
              value={this.state.no_ktp}
              onChange={evt => {
                this.setInput('no_ktp', evt.target.value);
                this.setNestedInput('ktp', 'no_ktp', evt.target.value);
              }}
              placeholder="3374..."
            />
            {this.state.validation.no_ktp && <h6>{this.state.validation.no_ktp}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Alamat</span>
            <textarea
              value={this.state.ktp.alamat}
              onChange={evt => this.setNestedInput('ktp', 'alamat', evt.target.value)}
              placeholder="Jl. Koesbiyono ..."
            />
            {this.state.validation.ktp.alamat && <h6>{this.state.validation.ktp.alamat}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Tempat Lahir</span>
            <input
              type="text"
              value={this.state.ktp.tempat_lahir}
              onChange={evt => this.setNestedInput('ktp', 'tempat_lahir', evt.target.value)}
              placeholder="Kota Jayapura..."
            />
            {this.state.validation.ktp.tempat_lahir && (
              <h6>{this.state.validation.ktp.tempat_lahir}</h6>
            )}
          </ModalInput>
          <ModalInput>
            <span>Tanggal Lahir</span>
            <input
              type="date"
              value={this.state.ktp.tanggal_lahir}
              onChange={evt => this.setNestedInput('ktp', 'tanggal_lahir', evt.target.value)}
              placeholder="Kota Jayapura..."
            />
            {this.state.validation.ktp.tanggal_lahir && (
              <h6>{this.state.validation.ktp.tanggal_lahir}</h6>
            )}
          </ModalInput>
          <TypeSwitcher isEdit={!this.props.create}>
            <span>Peran</span>
            <button
              className={this.state.peran.toLowerCase() === 'picker' ? 'selected' : ''}
              disabled={this.state.peran.toLowerCase() === 'picker' || !this.props.create}
              onClick={() => this.setInput('peran', 'picker')}
            >
              Picker
            </button>
            <button
              className={this.state.peran.toLowerCase() === 'driver' ? 'selected' : ''}
              disabled={this.state.peran.toLowerCase() === 'driver' || !this.props.create}
              onClick={() => this.setInput('peran', 'driver')}
            >
              Driver
            </button>
          </TypeSwitcher>
          {this.state.peran.toLowerCase() === 'picker' && (
            <ModalInput>
              <span>Supplier:</span>
              <select
                value={this.state.id_supplier}
                onChange={evt => this.setInput('id_supplier', evt.target.value)}
              >
                <option disabled value="">
                  Pilih Supplier
                </option>
                {supplier.filter(s => s.is_active).map(value => (
                  <option key={`${value.nama}${value.address}`} value={value.id}>
                    {value.nama}
                  </option>
                ))}
              </select>
              {this.state.validation.id_supplier && <h6>{this.state.validation.id_supplier}</h6>}
            </ModalInput>
          )}
          {this.state.peran.toLowerCase() === 'driver' && (
            <ModalInput>
              <span>Nomor SIM</span>
              <input
                type="text"
                value={this.state.no_sim}
                onChange={evt => {
                  this.setInput('no_sim', evt.target.value);
                  this.setNestedInput('sim', 'no_sim', evt.target.value);
                }}
                placeholder="3374..."
              />
              {this.state.validation.no_sim && <h6>{this.state.validation.no_sim}</h6>}
            </ModalInput>
          )}
          {this.state.peran.toLowerCase() === 'driver' && (
            <ModalInput>
              <span>Jenis SIM</span>
              <input
                type="text"
                value={this.state.sim.jenis_sim}
                onChange={evt => this.setNestedInput('sim', 'jenis_sim', evt.target.value)}
                placeholder="Kota Jayapura..."
              />
              {this.state.validation.sim.jenis_sim && (
                <h6>{this.state.validation.sim.jenis_sim}</h6>
              )}
            </ModalInput>
          )}
          <ModalSubmit onClick={this.save}>{create ? 'Tambah' : 'Simpan'}</ModalSubmit>
        </ModalContent>
      </ModalWrapper>
    );
  }
}

const TypeSwitcher = styled(ModalSwitcher)`
  button {
    &:disabled,
    &:hover,
    &:focus {
      opacity: ${props => (props.isEdit ? '0.5' : '1')};
      color: ${props => props.theme.color.black};
      background: ${props => props.theme.color.pure};

      &.selected {
        color: ${props => props.theme.color.pure};
        background: ${props => props.theme.color.blue};
      }
    }
  }
`;
