import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import swal from 'sweetalert';

import IconChevronBlue from 'assets/icon_chevron_blue.svg';
import IconUploadWhite from 'assets/icon_upload_white.svg';
import Placeholder from 'assets/placeholder.png';

import { PICKER_TASK_HEADER_FIELDS, PICKER_TASK_TEMPLATE } from 'commons/structure';
import { htmlInputDateFormatter } from 'commons/utils';

import {
  ModalWrapper,
  ModalClose,
  ModalTitle,
  ModalContent,
  ModalInput,
  ModalSwitcher,
  ModalSubmit,
  ModalImageInput,
} from 'components/SharedElements';

import * as api from 'services/api';

export default class PurchaseModal extends Component {
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
        validation: {},
        uploading: false,
      };

      PICKER_TASK_HEADER_FIELDS.forEach(value => {
        this.state[value] = '';
        this.state.validation[value] = '';
      });

      this.state.delivery_date = Moment()
        .format('YYYY/MM/DD')
        .toString();

      this.state.status = 'pending';
    } else {
      this.state = {
        ...data,
        validation: {},
        uploading: false,
      };

      PICKER_TASK_HEADER_FIELDS.forEach(value => {
        this.state.validation[value] = '';
      });
    }
  }

  setInput = (field, value) => {
    this.setState({ [field]: value });
  };

  save = () => {
    if (this.validate()) {
      this.props.save(this.state);
      this.props.close();
    }
  };

  validate = () => {
    const validation = {};

    PICKER_TASK_HEADER_FIELDS.forEach(value => {
      validation[value] = '';
    });

    let invalid = false;
    const numberRegExp = /^\d+$/;

    if (this.state.nama_barang === '') {
      invalid = true;
      validation.nama_barang = 'Nama produk tidak bisa kosong';
    }

    if (!numberRegExp.test(this.state.total_jumlah) || this.state.total_jumlah <= 0) {
      invalid = true;
      validation.total_jumlah =
        'Jumlah produk harus dalam angka atau tidak boleh kurang dari sama dengan 0';
    }

    if (this.state.jenis_sub_task === '') {
      invalid = true;
      validation.jenis_sub_task = 'Tipe tugas tidak bisa kosong';
    }

    if (this.state.id_supplier === '') {
      invalid = true;
      validation.id_supplier = 'Supplier tujuan tidak bisa kosong';
    }

    if (this.state.foto_contoh_barang === '') {
      invalid = true;
      validation.foto_contoh_barang = 'Foto Produk tidak boleh kosong';
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
        this.setState({ foto_contoh_barang: result.body.secure_url });
      } else {
        swal({
          icon: 'error',
          title: 'Error Uploading Image',
          text: 'Terjadi kesalahan dalam pengunggahan gambar, silahkan coba lagi',
        });
      }

      this.setState({ uploading: false });
      this.fotoBarangInput.value = '';
    }
  };

  render() {
    const { supplier, create, close } = this.props;

    // {
    //   jenis_sub_task: '0 Untuk Pembatalan, 1 Untuk Pembelian',
    //   total_jumlah: 'Angka',
    //   nama_barang: 'Kombo Nama',
    //   id_supplier: 'ID Supplier sesuai dengan data di halaman supplier',
    //   foto_contoh_barang: 'URL Foto Barang',
    // },

    return (
      <ModalWrapper>
        <ModalClose onClick={close}>
          <img src={IconChevronBlue} alt="chevron" />Kembali
        </ModalClose>
        <ModalTitle>{create ? 'Tambah Tugas Pemesanan' : 'Ubah Tugas Pemesanan'}</ModalTitle>
        <ModalContent>
          <h4>* = required</h4>
          <ModalInput>
            <span>Nama Produk*</span>
            <textarea
              type="text"
              value={this.state.nama_barang}
              onChange={evt => this.setInput('nama_barang', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE[0].nama_barang}
            />
            {this.state.validation.nama_barang && <h6>{this.state.validation.nama_barang}</h6>}
          </ModalInput>
          <ModalInput>
            <span>Quantity*</span>
            <input
              type="number"
              value={this.state.total_jumlah}
              onChange={evt => this.setInput('total_jumlah', evt.target.value)}
              placeholder={PICKER_TASK_TEMPLATE[0].total_jumlah}
            />
            {this.state.validation.total_jumlah && <h6>{this.state.validation.total_jumlah}</h6>}
          </ModalInput>
          <ModalSwitcher>
            <span>Tipe*</span>
            <button
              disabled={this.state.jenis_sub_task === 1}
              onClick={() => this.setInput('jenis_sub_task', 1)}
            >
              Purchase
            </button>
            <button
              disabled={this.state.jenis_sub_task === 0}
              onClick={() => this.setInput('jenis_sub_task', 0)}
            >
              Cancel
            </button>
            {this.state.validation.jenis_sub_task && (
              <h6>{this.state.validation.jenis_sub_task}</h6>
            )}
          </ModalSwitcher>
          <ModalInput>
            <span>Supplier*</span>
            <select
              value={this.state.id_supplier}
              onChange={evt => this.setInput('id_supplier', evt.target.value)}
            >
              <option disabled value="">
                Pilih Supplier
              </option>
              {supplier.map(value => (
                <option key={`${value.id}-${value.nama}`} value={value.id}>
                  {value.nama}
                </option>
              ))}
            </select>
            {this.state.validation.id_supplier && <h6>{this.state.validation.id_supplier}</h6>}
          </ModalInput>
          <ModalImageInput uploading={this.state.uploading}>
            <img
              src={this.state.foto_contoh_barang ? this.state.foto_contoh_barang : Placeholder}
              alt="Foto Produk"
            />
            <div>
              <span>Profile Picture</span>
              <label disabled={this.state.uploading} htmlFor="employee-profile-pic">
                <img src={IconUploadWhite} alt="upload" />
                {this.state.uploading ? 'Mengunggah' : 'Gambar'}
                <input
                  ref={e => (this.fotoBarangInput = e)}
                  type="file"
                  id="employee-profile-pic"
                  onChange={this.handleImageChange}
                  disabled={this.state.uploading}
                  accept="image/*"
                />
              </label>
              {this.state.validation.foto_contoh_barang && (
                <h6>{this.state.validation.foto_contoh_barang}</h6>
              )}
            </div>
          </ModalImageInput>
          <ModalSubmit onClick={this.save}>{create ? 'Tambah' : 'Simpan'}</ModalSubmit>
        </ModalContent>
      </ModalWrapper>
    );
  }
}
