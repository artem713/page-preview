import { IWebpageMetadata } from './webpage-metadata.interface'

export enum OGMetadataAttributes {
  name = 'property',
  value = 'content',
}

export enum OGMetadataKeys {
  title = 'og:title',
  description = 'og:description',
  image = 'og:image',
}

export function toOGMetadata(metadata: any) {
  const _metadata = metadata as IWebpageMetadata[]
  
  return _metadata
    .filter(filterOGMetadata)
    .reduce((meta: IWebpageMetadata, item: IWebpageMetadata) => ({
      ...meta,
      ...getOGMetadata(item)
    }), {})
}

function filterOGMetadata(meta: IWebpageMetadata) {
  return meta['property'] && meta['property'].includes('og:')
}

function getOGMetadata(meta: IWebpageMetadata) {
  return {
    [meta[OGMetadataAttributes.name]]: meta[OGMetadataAttributes.value]
  }
}