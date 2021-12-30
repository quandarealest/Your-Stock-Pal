import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './App.css';
import { countries, assetTypes } from './countries';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedCountry: '',
      pickedAsset: 0,
      inputNameValue: '',
      inputValue: '',
      selectedAssets: {
        bank: [],
        stock: [],
        crypto: []
      },
    }
  };

  onSelectCountries = (e) => {
    this.setState({
      pickedCountry: e.target.value,
    })
  }

  onSelectAsset = (e) => {
    this.setState({
      pickedAsset: e.target.value,
    })
  }

  onSaveAssetValue = () => {
    if (this.state.pickedAsset === 0) {
      this.setState({
        selectedAssets: {
          ...this.state.selectedAssets,
          bank: [
            ...this.state.selectedAssets.bank,
            {
              name: this.state.inputNameValue,
              currency: 'USD',
              value: this.state.inputValue,
            }
          ]
        }
      })
    } else if (this.state.pickedAsset === 1) {
      this.setState({
        selectedAssets: {
          ...this.state.selectedAssets,
          stock: [
            ...this.state.selectedAssets.stock,
            {
              name: this.state.inputNameValue,
              currency: 'USD',
              value: this.state.inputValue,
            }
          ]
        }
      })
    } else {
      this.setState({
        selectedAssets: {
          ...this.state.selectedAssets,
          crypto: [
            ...this.state.selectedAssets.crypto,
            {
              name: this.state.inputNameValue,
              currency: 'USD',
              value: this.state.inputValue,
            }
          ]
        }
      })
    }
    this.setState({
      inputNameValue: '',
      inputValue: '',
    })
  }

  updateNameInputValue = (e) => {
    this.setState({
      inputNameValue: e.target.value,
    })
  }

  updateInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  render() {
    return (
      <div className="App">
        <h3>
          Choose your region:
      </h3>
        <select onChange={this.onSelectCountries}>
          {countries.map((country, index) => {
            return (
              <option value={country.countryCode}>
                {country.countryName}
              </option>
            )
          })}
        </select>
        {this.state.pickedCountry !== '' && (
          <>
            <h3>
              Choose your type of asset:
            </h3>
            <select defaultValue={this.state.pickedAsset} onChange={this.onSelectAsset}>
              {assetTypes.map((asset, index) => {
                return (
                  <option value={asset.id}>
                    {asset.name}
                  </option>
                )
              })}
            </select>
            {this.state.pickedAsset !== '' && (
              <>
                <h3>
                  Bank Name/Platform Name:
                </h3>
                <input value={this.state.inputNameValue} onChange={this.updateNameInputValue} />
                <br />
                <h3>
                  Value:
                </h3>
                <span>{countries.find((country) => country.countryCode === this.state.pickedCountry).currencyCode}</span>
                <input value={this.state.inputValue} onChange={this.updateInputValue} />
                <br />
                <button onClick={this.onSaveAssetValue}>
                  Save
                </button>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
