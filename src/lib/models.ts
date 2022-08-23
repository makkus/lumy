/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export type ValueStatus = "unknown" | "not set" | "none" | "default" | "set";

/**
 * A class to hold the type and configuration for a module instance.
 */
export interface ValuePedigree {
  /**
   * The module type.
   */
  module_type: string;
  /**
   * The configuration for the module.
   */
  module_config?: {
    [k: string]: unknown;
  };
  /**
   * Whether the configuration of this module was augmented with the module type defaults etc.
   */
  is_resolved?: boolean;
  /**
   * A map of all the input fields and value references.
   */
  inputs: {
    [k: string]: string;
  };
  /**
   * The id of the kiara context a value was created in.
   */
  kiara_id: string;
  /**
   * References to the runtime environment details a value was created in.
   */
  environments: {
    [k: string]: string;
  };
}
/**
 * A class to hold the type and configuration for a module instance.
 */
export interface Operation {
  /**
   * The module type.
   */
  module_type: string;
  /**
   * The configuration for the module.
   */
  module_config?: {
    [k: string]: unknown;
  };
  /**
   * Whether the configuration of this module was augmented with the module type defaults etc.
   */
  is_resolved?: boolean;
  /**
   * The (unique) id of this operation.
   */
  operation_id: string;
  /**
   * The operation specific details of this operation.
   */
  operation_details: OperationDetails;
  /**
   * Documentation for this operation.
   */
  doc: Documentation;
  /**
   * The class of the underlying module.
   */
  module_details: KiaraModuleInstance;
  /**
   * Additional metadata for this operation.
   */
  metadata?: {
    [k: string]: unknown;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface OperationDetails {
  /**
   * The id of the operation.
   */
  operation_id: string;
  /**
   * Whether this operation is mainly used kiara-internally. Helps to hide it in UIs (operation lists etc.).
   */
  is_internal_operation?: boolean;
}
/**
 * Documentation about a resource.
 */
export interface Documentation {
  /**
   * Short description of the item.
   */
  description?: string;
  /**
   * Detailed documentation of the item (in markdown).
   */
  doc?: string;
}
/**
 * Python class and module information.
 */
export interface KiaraModuleInstance {
  /**
   * The name of the Python class.
   */
  python_class_name: string;
  /**
   * The name of the Python module this class lives in.
   */
  python_module_name: string;
  /**
   * The full class namespace.
   */
  full_name: string;
  /**
   * The module config.
   */
  module_config: {
    [k: string]: unknown;
  };
  /**
   * The schema for the module input(s).
   */
  inputs_schema: {
    [k: string]: ValueSchema;
  };
  /**
   * The schema for the module output(s).
   */
  outputs_schema: {
    [k: string]: ValueSchema;
  };
}
/**
 * The schema of a value.
 *
 * The schema contains the [ValueTypeOrm][kiara.data.values.ValueTypeOrm] of a value, as well as an optional default that
 * will be used if no user input was given (yet) for a value.
 *
 * For more complex container data_types like array, tables, unions etc, data_types can also be configured with values from the ``type_config`` field.
 */
export interface ValueSchema {
  /**
   * The type of the value.
   */
  type: string;
  /**
   * Configuration for the type, in case it's complex.
   */
  type_config?: {
    [k: string]: unknown;
  };
  /**
   * A default value.
   */
  default?: string;
  /**
   * Whether this value is required (True), or whether 'None' value is allowed (False).
   */
  optional?: boolean;
  /**
   * Whether the value is a constant.
   */
  is_constant?: boolean;
  /**
   * A description for the value of this input field.
   */
  doc?: Documentation;
}
/**
 * A wrapper class that manages and retieves value data and its details.
 */
export interface ValueDetails {
  /**
   * The id of the value.
   */
  value_id: string;
  /**
   * The id of the kiara context this value belongs to.
   */
  kiara_id: string;
  /**
   * The schema that was used for this Value.
   */
  value_schema: ValueSchema;
  /**
   * The set/unset status of this value.
   */
  value_status: ValueStatus;
  /**
   * The size of this value, in bytes.
   */
  value_size: number;
  /**
   * The hash of this value.
   */
  value_hash: string;
  /**
   * Information about the module and inputs that went into creating this value.
   */
  pedigree: ValuePedigree;
  /**
   * The output name that produced this value (using the manifest inside the pedigree).
   */
  pedigree_output_name: string;
  /**
   * The python class that is associtated with this model.
   */
  data_type_class: PythonClass;
}
/**
 * Python class and module information.
 */
export interface PythonClass {
  /**
   * The name of the Python class.
   */
  python_class_name: string;
  /**
   * The name of the Python module this class lives in.
   */
  python_module_name: string;
  /**
   * The full class namespace.
   */
  full_name: string;
}
/**
 * A wrapper class that manages and retieves value data and its details.
 */
export interface Value {
  /**
   * The id of the value.
   */
  value_id: string;
  /**
   * The id of the kiara context this value belongs to.
   */
  kiara_id: string;
  /**
   * The schema that was used for this Value.
   */
  value_schema: ValueSchema;
  /**
   * The set/unset status of this value.
   */
  value_status: ValueStatus;
  /**
   * The size of this value, in bytes.
   */
  value_size: number;
  /**
   * The hash of this value.
   */
  value_hash: string;
  /**
   * Information about the module and inputs that went into creating this value.
   */
  pedigree: ValuePedigree;
  /**
   * The output name that produced this value (using the manifest inside the pedigree).
   */
  pedigree_output_name: string;
  /**
   * The python class that is associtated with this model.
   */
  data_type_class: PythonClass;
  /**
   * Hashes for the environments this value was created in.
   */
  environment_hashes: {
    [k: string]: {
      [k: string]: string;
    };
  };
  /**
   * Information about the environments this value was created in.
   */
  enviroments?: {
    [k: string]: {
      [k: string]: unknown;
    };
  };
  /**
   * Links to values that are properties of this value.
   */
  property_links?: {
    [k: string]: string;
  };
  /**
   * Backlinks to values that this value acts as destiny/or property for.
   */
  destiny_backlinks?: {
    [k: string]: string;
  };
}
/**
 * A wrapper class that manages and retieves value data and its details.
 */
export interface ValueInfo {
  /**
   * The value id.
   */
  value_id: string;
  /**
   * The id of the kiara context this value belongs to.
   */
  kiara_id: string;
  /**
   * The data schema of this value.
   */
  value_schema: ValueSchema;
  /**
   * The set/unset status of this value.
   */
  value_status: ValueStatus;
  /**
   * The size of this value, in bytes.
   */
  value_size: number;
  /**
   * The hash of this value.
   */
  value_hash: string;
  /**
   * Information about the module and inputs that went into creating this value.
   */
  pedigree: ValuePedigree;
  /**
   * The output name that produced this value (using the manifest inside the pedigree).
   */
  pedigree_output_name: string;
  /**
   * The python class that is associtated with this model.
   */
  data_type_class: PythonClass;
  /**
   * Hashes for the environments this value was created in.
   */
  environment_hashes: {
    [k: string]: {
      [k: string]: string;
    };
  };
  /**
   * Information about the environments this value was created in.
   */
  enviroments?: {
    [k: string]: {
      [k: string]: unknown;
    };
  };
  /**
   * Links to values that are properties of this value.
   */
  property_links?: {
    [k: string]: string;
  };
  /**
   * Backlinks to values that this value acts as destiny/or property for.
   */
  destiny_backlinks?: {
    [k: string]: string;
  };
  /**
   * The aliases that are registered for this value.
   */
  aliases?: string[];
  /**
   * Details for the serialization process that was used for this value.
   */
  serialized?: PersistedData;
  /**
   * References to all the values that act as destiny for this value in this context.
   */
  destiny_links?: {
    [k: string]: string;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface PersistedData {
  /**
   * The name of the data type for this serialized value.
   */
  data_type: string;
  /**
   * The (optional) config for the data type for this serialized value.
   */
  data_type_config?: {
    [k: string]: unknown;
  };
  /**
   * An identifying name for the serialization method used.
   */
  serialization_profile: string;
  /**
   * Optional metadata describing aspects of the serialization used.
   */
  metadata?: SerializationMetadata;
  /**
   * The codec used to hash the value.
   */
  hash_codec?: string;
  /**
   * The id of the store that persisted the data.
   */
  archive_id: string;
  /**
   * Reference-ids that resolve to the values' serialized chunks.
   */
  chunk_id_map: {
    [k: string]: SerializedChunkIDs;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface SerializationMetadata {
  /**
   * Hash(es) for the environments the value was created/serialized.
   */
  environment?: {
    [k: string]: number;
  };
  /**
   * Suggested manifest configs to use to de-serialize the data.
   */
  deserialize?: {
    [k: string]: Manifest;
  };
}
/**
 * A class to hold the type and configuration for a module instance.
 */
export interface Manifest {
  /**
   * The module type.
   */
  module_type: string;
  /**
   * The configuration for the module.
   */
  module_config?: {
    [k: string]: unknown;
  };
  /**
   * Whether the configuration of this module was augmented with the module type defaults etc.
   */
  is_resolved?: boolean;
}
export interface SerializedChunkIDs {
  type?: "chunk-ids";
  /**
   * A list of chunk ids, which will be resolved via the attached data registry.
   */
  chunk_id_list: string[];
  /**
   * The preferred data archive to get the chunks from.
   */
  archive_id?: string;
  /**
   * The size of all chunks combined.
   */
  size: number;
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface ValueMapReadOnly {
  /**
   * The schemas for all the values in this set.
   */
  values_schema: {
    [k: string]: ValueSchema;
  };
  /**
   * The values contained in this set.
   */
  value_items: {
    [k: string]: Value;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface ValueMapWritable {
  /**
   * The schemas for all the values in this set.
   */
  values_schema: {
    [k: string]: ValueSchema;
  };
  /**
   * The values contained in this set.
   */
  value_items?: {
    [k: string]: Value;
  };
  /**
   * The pedigree to add to all of the result values.
   */
  pedigree: ValuePedigree;
  /**
   * Whether this value map always creates new value(id)s, even when a dataset with matching hash is found.
   */
  unique_value_ids?: boolean;
}
/**
 * A model class that holds a tree of values and their schemas.
 */
export interface AliasValueMap {
  /**
   * The schemas for all the values in this set.
   */
  values_schema: {
    [k: string]: ValueSchema;
  };
  /**
   * This maps own (full) alias.
   */
  alias?: string;
  /**
   * The version of this map (in this maps parent).
   */
  version: number;
  /**
   * The time this map was created.
   */
  created?: string;
  /**
   * The schema for this maps associated value.
   */
  assoc_schema?: ValueSchema;
  /**
   * The value that is associated with this map.
   */
  assoc_value?: string;
  /**
   * The values contained in this set.
   */
  value_items?: {
    [k: string]: {
      [k: string]: AliasValueMap;
    };
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface BaseOperationDetails {
  /**
   * The id of the operation.
   */
  operation_id: string;
  /**
   * Whether this operation is mainly used kiara-internally. Helps to hide it in UIs (operation lists etc.).
   */
  is_internal_operation?: boolean;
  /**
   * The input schemas of the module.
   */
  module_inputs_schema: {
    [k: string]: ValueSchema;
  };
  /**
   * The output schemas of the module.
   */
  module_outputs_schema: {
    [k: string]: ValueSchema;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface ManifestOperationConfig {
  /**
   * Documentation for this operation.
   */
  doc: Documentation;
  /**
   * The module type.
   */
  module_type: string;
  /**
   * The configuration for the module.
   */
  module_config?: {
    [k: string]: unknown;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface PipelineOperationConfig {
  /**
   * Documentation for this operation.
   */
  doc: Documentation;
  /**
   * The pipeline id.
   */
  pipeline_name: string;
  /**
   * The pipeline config data.
   */
  pipeline_config: {
    [k: string]: unknown;
  };
  /**
   * A lookup map to resolves operation ids to module names/configs.
   */
  module_map?: {
    [k: string]: unknown;
  };
  /**
   * Additional metadata for the pipeline.
   */
  metadata?: {
    [k: string]: unknown;
  };
}
/**
 * Object containing all the result properties of a 'render_value' operation.
 */
export interface RenderValueResult {
  /**
   * The value that was rendered.
   */
  value_id: string;
  /**
   * The config that was used to render this.
   */
  render_config: {
    [k: string]: unknown;
  };
  /**
   * The id of the manifest that was used to render this.
   */
  render_manifest: string;
  /**
   * Other render scenes, related to this one.
   */
  related_scenes?: {
    [k: string]: RenderScene;
  };
  /**
   * The manifests referenced in this model, indexed by the hashes.
   */
  manifest_lookup?: {
    [k: string]: Manifest;
  };
  /**
   * The rendered object.
   */
  rendered?: {
    [k: string]: unknown;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface RenderScene {
  /**
   * The title of this scene.
   */
  title: string;
  /**
   * Whether this scene should be displayed as 'disabled' in a UI.
   */
  disabled?: boolean;
  /**
   * Description of what this scene renders.
   */
  description?: string;
  /**
   * The hash of the manifest of the referenced render scene.
   */
  manifest_hash: string;
  /**
   * The inputs used with the referenced manifest.
   */
  render_config?: {
    [k: string]: unknown;
  };
  /**
   * Other render scenes, related to this one.
   */
  related_scenes?: {
    [k: string]: RenderScene;
  };
}
/**
 * An object describing requirements values should satisfy in order to be included in a query result.
 */
export interface ValueMatcher {
  /**
   * The data type.
   */
  data_types?: string[];
  /**
   * Allow subtypes.
   */
  allow_sub_types?: boolean;
  /**
   * The minimum size for the dataset.
   */
  min_size?: number;
  /**
   * The maximum size for the dataset.
   */
  max_size?: number;
  /**
   * Allow internal data types.
   */
  allow_internal?: boolean;
  /**
   * Value must have at least one alias.
   */
  has_alias?: boolean;
}
