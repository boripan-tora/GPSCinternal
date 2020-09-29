import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GpscInternalWebPartStrings';
import GpscInternal from './components/GpscInternal';
import { IGpscInternalProps } from './components/IGpscInternalProps';

export interface IGpscInternalWebPartProps {
  description: string;
}

export default class GpscInternalWebPart extends BaseClientSideWebPart<IGpscInternalWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGpscInternalProps > = React.createElement(
      GpscInternal,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
