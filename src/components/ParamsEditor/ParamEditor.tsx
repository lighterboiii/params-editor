import { Component } from 'react';

interface IParam {
  id: number;
  name: string;
  type: 'string' | 'select';
  options?: string[];
}

interface IParamValue {
  paramId: number;
  value: string;
}

interface IColor {
  id: number;
  name: string;
}

interface IModel {
  paramValues: IParamValue[];
  colors: IColor[];
}

interface IProps {
  params: IParam[];
  model: IModel;
  onModelChange?: (updatedModel: IModel) => void;
}

interface IState {
  paramValues: IParamValue[];
}

class ParamEditor extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      paramValues: [...props.model.paramValues],
    };
  }

  handlChangeParam = (paramId: number, value: string) => {
    const { paramValues } = this.state;
    const updatedParamValues = paramValues.map((param) => {
      if (param.paramId === paramId) {
        return { ...param, value };
      }
      return param;
    });
    this.setState({ paramValues: updatedParamValues });
  };
  getModel(): IModel {
    return { ...this.props.model, paramValues: this.state.paramValues };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label htmlFor={`${param.id}`}>{param.name}</label>
            {param.type === 'select' ? (
              <select
                id={`${param.id}`}
                value={paramValues.find((p) => p.paramId === param.id)?.value || ''}
                onChange={e => this.handlChangeParam(param.id, e.target.value)}
              >
                {param.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id={`${param.id}`}
                value={paramValues.find((p) => p.paramId === param.id)?.value || ''}
                onChange={(evt) => this.handlChangeParam(param.id, evt.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}

class App extends Component<{}, { model: IModel }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      model: {
        paramValues: [
          { paramId: 1, value: 'повседневное' },
          { paramId: 2, value: 'макси' },
        ],
        colors: [{ id: 1, name: 'Красный' }, { id: 2, name: 'Синий' }],
      },
    };
  }

  handleModelChange = (updatedModel: IModel) => {
    this.setState({ model: updatedModel });
  };

  render() {
    const { model } = this.state;

    return (
      <div>
        <ParamEditor
          params={[
            { id: 1, name: 'Назначение', type: 'string' },
            { id: 2, name: 'Длина', type: 'string' },
          ]}
          model={model}
          onModelChange={this.handleModelChange}
        />
      </div>
    );
  }
}

export default App;
