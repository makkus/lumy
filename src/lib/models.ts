/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export type JobStatus = "__job_created__" | "__job_started__" | "__job_success__" | "__job_failed__";
export type ValueStatus = "unknown" | "not set" | "none" | "default" | "set";
/**
 * Enum to describe the state of a workflow.
 */
export type StepStatus = "inputs_invalid" | "inputs_ready" | "results_ready";

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
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface ActiveJob {
  /**
   * The job id.
   */
  job_id: string;
  /**
   * The job details.
   */
  job_config: JobConfig;
  /**
   * The current status of the job.
   */
  status?: JobStatus & string;
  /**
   * The lob jog.
   */
  job_log: JobLog;
  /**
   * When the job was submitted.
   */
  submitted?: string;
  /**
   * When the job was started.
   */
  started?: string;
  /**
   * When the job was finished.
   */
  finished?: string;
  /**
   * The result(s).
   */
  results?: {
    [k: string]: string;
  };
  /**
   * Potential error message.
   */
  error?: string;
}
/**
 * A class to hold the type and configuration for a module instance.
 */
export interface JobConfig {
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
}
export interface JobLog {
  /**
   * The logs for this job.
   */
  log?: LogMessage[];
  /**
   * Describes how much of the job is finished. A negative number means the module does not support progress tracking.
   */
  percent_finished?: number;
}
export interface LogMessage {
  /**
   * The time the message was logged.
   */
  timestamp?: string;
  /**
   * The log level.
   */
  log_level: number;
  /**
   * The log message
   */
  msg: string;
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
   * Information about the data type this value is made of.
   */
  data_type_info: DataTypeInfo;
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface DataTypeInfo {
  /**
   * The registered name of this data type.
   */
  data_type_name: string;
  /**
   * The (optional) configuration for this data type.
   */
  data_type_config?: {
    [k: string]: unknown;
  };
  /**
   * Characteristics of this data type.
   */
  characteristics: DataTypeCharacteristics;
  /**
   * The python class that is associated with this model.
   */
  data_type_class: PythonClass;
}
export interface DataTypeCharacteristics {
  /**
   * Whether the data desribed by this data type behaves like a skalar.
   */
  is_scalar?: boolean;
  /**
   * Whether the data can be serialized to json without information loss.
   */
  is_json_serializable?: boolean;
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
   * Information about the data type this value is made of.
   */
  data_type_info: DataTypeInfo;
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
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface PipelineStage {
  /**
   * The index of this stage.
   */
  stage_index: number;
  /**
   * The pipeline steps that are executed in this stage.
   */
  steps: string[];
  /**
   * The pipeline inputs required for this stage.
   */
  pipeline_inputs: string[];
  /**
   * The pipeline outputs that are ready once this stage is processed.
   */
  pipeline_outputs: string[];
  /**
   * Pipeline inputs that are already set by this stage.
   */
  previous_inputs: string[];
  /**
   * Pipeline outputs that are already computed by this stage.
   */
  previous_outputs: string[];
}
/**
 * Base class that holds/manages information about an item within kiara.
 */
export interface PipelineInfo {
  /**
   * The registered name for this item type.
   */
  type_name: string;
  /**
   * Documentation for the item.
   */
  documentation: Documentation;
  /**
   * Information about authorship for the item.
   */
  authors: Authors;
  /**
   * Generic properties of this item (description, tags, labels, references, ...).
   */
  context: Context;
  /**
   * The configuration of the pipeline.
   */
  pipeline_config: PipelineConfig;
  /**
   * The current input details.
   */
  pipeline_state: PipelineState;
}
/**
 * Information about all authors of a resource.
 */
export interface Authors {
  /**
   * The authors/creators of this item.
   */
  authors?: Author[];
  [k: string]: unknown;
}
/**
 * Details about an author of a resource.
 */
export interface Author {
  /**
   * The full name of the author.
   */
  name: string;
  /**
   * The email address of the author
   */
  email?: string;
}
/**
 * Information about the context of a resource.
 */
export interface Context {
  /**
   * References for the item.
   */
  references?: {
    [k: string]: Link;
  };
  /**
   * A list of tags for the item.
   */
  tags?: string[];
  /**
   * A list of labels for the item.
   */
  labels?: {
    [k: string]: string;
  };
  [k: string]: unknown;
}
/**
 * A description and url for a reference of any kind.
 */
export interface Link {
  /**
   * The url.
   */
  url: string;
  /**
   * A short description of the link content.
   */
  desc?: string;
}
/**
 * A class to hold the configuration for a [PipelineModule][kiara.pipeline.module.PipelineModule].
 *
 * If you want to control the pipeline input and output names, you need to have to provide a map that uses the
 * autogenerated field name ([step_id]__[alias] -- 2 underscores!!) as key, and the desired field name
 * as value. The reason that schema for the autogenerated field names exist is that it's hard to ensure
 * the uniqueness of each field; some steps can have the same input field names, but will need different input
 * values. In some cases, some inputs of different steps need the same input. Those sorts of things.
 * So, to make sure that we always use the right values, I chose to implement a conservative default approach,
 * accepting that in some cases the user will be prompted for duplicate inputs for the same value.
 *
 * To remedy that, the pipeline creator has the option to manually specify a mapping to rename some or all of
 * the input/output fields.
 *
 * Further, because in a lot of cases there won't be any overlapping fields, the creator can specify ``auto``,
 * in which case *Kiara* will automatically create a mapping that tries to map autogenerated field names
 * to the shortest possible names for each case.
 *
 * Examples:
 *
 *     Configuration for a pipeline module that functions as a ``nand`` logic gate (in Python):
 *
 *     ``` python
 *     and_step = PipelineStepConfig(module_type="and", step_id="and")
 *     not_step = PipelineStepConfig(module_type="not", step_id="not", input_links={"a": ["and.y"]}
 *     nand_p_conf = PipelineConfig(doc="Returns 'False' if both inputs are 'True'.",
 *                         steps=[and_step, not_step],
 *                         input_aliases={
 *                             "and__a": "a",
 *                             "and__b": "b"
 *                         },
 *                         output_aliases={
 *                             "not__y": "y"
 *                         }}
 *     ```
 *
 *     Or, the same thing in json:
 *
 *     ``` json
 *     {
 *       "module_type_name": "nand",
 *       "doc": "Returns 'False' if both inputs are 'True'.",
 *       "steps": [
 *         {
 *           "module_type": "and",
 *           "step_id": "and"
 *         },
 *         {
 *           "module_type": "not",
 *           "step_id": "not",
 *           "input_links": {
 *             "a": "and.y"
 *           }
 *         }
 *       ],
 *       "input_aliases": {
 *         "and__a": "a",
 *         "and__b": "b"
 *       },
 *       "output_aliases": {
 *         "not__y": "y"
 *       }
 *     }
 *     ```
 */
export interface PipelineConfig {
  /**
   * Value constants for this module.
   */
  constants?: {
    [k: string]: unknown;
  };
  /**
   * Value defaults for this module.
   */
  defaults?: {
    [k: string]: unknown;
  };
  /**
   * The name of this pipeline.
   */
  pipeline_name: string;
  /**
   * A list of steps/modules of this pipeline, and their connections.
   */
  steps: PipelineStep[];
  /**
   * A map of input aliases, with the location of the input (in the format '[step_id].[input_field]') as key, and the pipeline input field name as value.
   */
  input_aliases: {
    [k: string]: string;
  };
  /**
   * A map of output aliases, with the location of the output (in the format '[step_id].[output_field]') as key, and the pipeline output field name as value.
   */
  output_aliases: {
    [k: string]: string;
  };
  /**
   * Documentation about what the pipeline does.
   */
  doc?: Documentation & string;
  /**
   * Metadata for this workflow.
   */
  context?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * A step within a pipeline-structure, includes information about it's connection(s) and other metadata.
 */
export interface PipelineStep {
  /**
   * The module type.
   */
  module_type: string;
  /**
   * The module config.
   */
  module_config?: {
    [k: string]: unknown;
  };
  /**
   * Whether the configuration of this module was augmented with the module type defaults etc.
   */
  is_resolved?: boolean;
  /**
   * Locally unique id (within a pipeline) of this step.
   */
  step_id: string;
  /**
   * The original manfifest provided by the user.
   */
  manifest_src: Manifest;
  /**
   * The links that connect to inputs of the module. Keys are field names, value(s) are connected outputs.
   */
  input_links?: {
    [k: string]: StepValueAddress[];
  };
  /**
   * The class of the underlying module.
   */
  module_details: KiaraModuleInstance;
  /**
   * A description what this step does.
   */
  doc: Documentation;
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
/**
 * Small model to describe the address of a value of a step, within a Pipeline/PipelineStructure.
 */
export interface StepValueAddress {
  /**
   * The id of a step within a pipeline.
   */
  step_id: string;
  /**
   * The name of the value (output name or pipeline input name).
   */
  value_name: string;
  /**
   * A reference to a subitem of a value (e.g. column, list item)
   */
  sub_value?: {
    [k: string]: unknown;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface PipelineState {
  /**
   * The id of the kiara context.
   */
  kiara_id: string;
  /**
   * The id of the pipeline.
   */
  pipeline_id: string;
  /**
   * The current status of this pipeline.
   */
  pipeline_status: StepStatus;
  /**
   * Details about fields that are invalid (if status < 'INPUTS_READY'.
   */
  invalid_details?: {
    [k: string]: string;
  };
  /**
   * The current pipeline inputs.
   */
  pipeline_inputs: {
    [k: string]: string;
  };
  /**
   * The current pipeline outputs.
   */
  pipeline_outputs: {
    [k: string]: string;
  };
  /**
   * The state of each step within this pipeline.
   */
  step_states: {
    [k: string]: StepDetails;
  };
}
export interface StepDetails {
  /**
   * The id of the kiara context.
   */
  kiara_id: string;
  /**
   * The id of the pipeline.
   */
  pipeline_id: string;
  /**
   * The pipeline step details.
   */
  step: PipelineStep;
  /**
   * The id of the step.
   */
  step_id: string;
  /**
   * The execution stage where this step is executed.
   */
  processing_stage: number;
  /**
   * The current status of this step.
   */
  status: StepStatus;
  /**
   * Details about fields that are invalid (if status < 'INPUTS_READY'.
   */
  invalid_details?: {
    [k: string]: string;
  };
  /**
   * The current inputs of this step.
   */
  inputs: {
    [k: string]: string;
  };
  /**
   * The current outputs of this step.
   */
  outputs: {
    [k: string]: string;
  };
}
/**
 * Base class that holds/manages information about an item within kiara.
 */
export interface WorkflowInfo {
  /**
   * The registered name for this item type.
   */
  type_name: string;
  /**
   * Documentation for the item.
   */
  documentation: Documentation;
  /**
   * Information about authorship for the item.
   */
  authors: Authors;
  /**
   * Generic properties of this item (description, tags, labels, references, ...).
   */
  context: Context;
  /**
   * The workflow details.
   */
  workflow_metadata: WorkflowMetadata;
  /**
   * All states for this workflow.
   */
  workflow_state_ids: string[];
  /**
   * The current state of the workflows' pipeline.
   */
  pipeline_info: PipelineInfo;
  /**
   * The current workflow inputs (after aliasing).
   */
  current_input_values: ValueMap;
  /**
   * The current workflow outputs (after aliasing).
   */
  current_output_values: ValueMap;
  /**
   * The (current) input aliases for this workflow.
   */
  input_aliases: {
    [k: string]: string;
  };
  /**
   * The (current) output aliases for this workflow.
   */
  output_aliases: {
    [k: string]: string;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface WorkflowMetadata {
  /**
   * The globaly unique uuid for this workflow.
   */
  workflow_id: string;
  /**
   * A description for this workflow.
   */
  documentation?: Documentation;
  /**
   * The author(s) of this workflow.
   */
  authors?: Authors;
  /**
   * Workflow context details.
   */
  context?: Context;
  /**
   * A reference to the current state of this workflow.
   */
  current_state?: string;
  /**
   * A history of all the states of this workflow.
   */
  workflow_history?: {
    [k: string]: string;
  };
  /**
   * A set of aliases that can be used to forward inputs to their (unaliased) pipeline inputs.
   */
  input_aliases?: {
    [k: string]: string;
  };
  /**
   * A set of aliases to make output field names more user friendly.
   */
  output_aliases?: {
    [k: string]: string;
  };
  /**
   * Whether this workflow is persisted in it's current state in a kiara store.
   */
  is_persisted?: boolean;
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface ValueMap {
  /**
   * The schemas for all the values in this set.
   */
  values_schema: {
    [k: string]: ValueSchema;
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
 * Base class that holds/manages information about an item within kiara.
 */
export interface OperationTypeInfo {
  /**
   * The registered name for this item type.
   */
  type_name: string;
  /**
   * Documentation for the item.
   */
  documentation: Documentation;
  /**
   * Information about authorship for the item.
   */
  authors: Authors;
  /**
   * Generic properties of this item (description, tags, labels, references, ...).
   */
  context: Context;
  /**
   * The python class that implements this module type.
   */
  python_class: PythonClass;
}
/**
 * Base class that holds/manages information about an item within kiara.
 */
export interface ValueInfo {
  /**
   * The registered name for this item type.
   */
  type_name: string;
  /**
   * Documentation for the item.
   */
  documentation: Documentation;
  /**
   * Information about authorship for the item.
   */
  authors: Authors;
  /**
   * Generic properties of this item (description, tags, labels, references, ...).
   */
  context: Context;
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
   * Information about the underlying data type and it's configuration.
   */
  data_type_info: DataTypeInfo;
  /**
   * The aliases that are registered for this value.
   */
  aliases?: string[];
  /**
   * Details for the serialization process that was used for this value.
   */
  serialized?: PersistedData;
  /**
   * Property data for this value.
   */
  properties?: {
    [k: string]: unknown;
  };
  /**
   * References to all the values that act as destiny for this value in this context.
   */
  destiny_links?: {
    [k: string]: string;
  };
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
   * Whether this value is only used internally in kiara.
   */
  is_internal?: boolean;
  /**
   * Whether this value is stored in at least one data store.
   */
  is_persisted: boolean;
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
 * Base class that holds/manages information about an item within kiara.
 */
export interface PipelineStructureInfo {
  /**
   * The registered name for this item type.
   */
  type_name: string;
  /**
   * Documentation for the item.
   */
  documentation: Documentation;
  /**
   * Information about authorship for the item.
   */
  authors: Authors;
  /**
   * Generic properties of this item (description, tags, labels, references, ...).
   */
  context: Context;
  /**
   * The underlying pipeline config.
   */
  pipeline_config: PipelineConfig;
  /**
   * All steps for this pipeline, indexed by their step_id.
   */
  steps: {
    [k: string]: PipelineStep;
  };
  /**
   * Additional information for each step.
   */
  step_details: {
    [k: string]: StepInfo;
  };
  /**
   * The input aliases.
   */
  input_aliases: {
    [k: string]: string;
  };
  /**
   * The output aliases.
   */
  output_aliases: {
    [k: string]: string;
  };
  /**
   * The input constants for this pipeline.
   */
  constants: {
    [k: string]: unknown;
  };
  /**
   * The default inputs for this pipeline.
   */
  defaults: {
    [k: string]: unknown;
  };
  /**
   * The pipeline inputs schema.
   */
  pipeline_input_fields: {
    [k: string]: FieldInfo;
  };
  /**
   * The pipeline outputs schema.
   */
  pipeline_output_fields: {
    [k: string]: FieldInfo;
  };
  /**
   * References to the step inputs that are linked to pipeline inputs.
   */
  pipeline_input_refs: {
    [k: string]: PipelineInputRef;
  };
  /**
   * References to the step outputs that are linked to pipeline outputs.
   */
  pipeline_output_refs: {
    [k: string]: PipelineOutputRef;
  };
  /**
   * Data describing the execution graph of this pipeline.
   */
  execution_graph: {
    [k: string]: unknown;
  };
  /**
   * Data describing the data flow of this pipeline.
   */
  data_flow_graph: {
    [k: string]: unknown;
  };
  /**
   * Data describing the (simplified) data flow of this pipeline.
   */
  data_flow_graph_simple: {
    [k: string]: unknown;
  };
  /**
   * A list of lists, containing all the step_ids per stage, in the order of execution.
   */
  processing_stages: string[][];
  /**
   * More detailed information about each step of this pipelines execution graph.
   */
  processing_stages_info: {
    [k: string]: PipelineStage;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface StepInfo {
  /**
   * The pipeline step object.
   */
  step: PipelineStep;
  /**
   * Reference(s) to the fields that feed this steps inputs.
   */
  inputs: {
    [k: string]: StepInputRef;
  };
  /**
   * Reference(s) to the fields that are fed by this steps outputs.
   */
  outputs: {
    [k: string]: StepOutputRef;
  };
  /**
   * Whether this step is always required or whether all his outputs feed into optional input fields.
   */
  required: boolean;
  /**
   * The index of the processing stage of this step.
   */
  processing_stage: number;
}
/**
 * An input to a step.
 *
 * This object can either have a 'connected_outputs' set, or a 'connected_pipeline_input', not both.
 */
export interface StepInputRef {
  value_name: string;
  value_schema: ValueSchema;
  /**
   * The step id.
   */
  step_id: string;
  /**
   * A potential connected list of one or several module outputs.
   */
  connected_outputs?: StepValueAddress[];
  /**
   * A potential pipeline input.
   */
  connected_pipeline_input?: string;
  /**
   * Whether this input is a constant and can't be changed by the user.
   */
  is_constant: boolean;
}
/**
 * An output to a step.
 */
export interface StepOutputRef {
  value_name: string;
  value_schema: ValueSchema;
  /**
   * The step id.
   */
  step_id: string;
  /**
   * The connected pipeline output.
   */
  pipeline_output?: string;
  /**
   * The step inputs that are connected to this step output
   */
  connected_inputs?: StepValueAddress[];
}
export interface FieldInfo {
  /**
   * The field name.
   */
  field_name: string;
  /**
   * The schema of the field.
   */
  field_schema: ValueSchema;
  /**
   * Information about the data type instance of the associated value.
   */
  data_type_info: DataTypeInfo;
  /**
   * Whether user input is required (meaning: 'optional' is False, and no default set).
   */
  value_required: boolean;
}
/**
 * An input to a pipeline.
 */
export interface PipelineInputRef {
  value_name: string;
  value_schema: ValueSchema;
  /**
   * The step inputs that are connected to this pipeline input
   */
  connected_inputs?: StepValueAddress[];
  /**
   * Whether this input is a constant and can't be changed by the user.
   */
  is_constant: boolean;
}
/**
 * An output to a pipeline.
 */
export interface PipelineOutputRef {
  value_name: string;
  value_schema: ValueSchema;
  /**
   * Connected step outputs.
   */
  connected_output: StepValueAddress;
}
/**
 * Base class that holds/manages information about an item within kiara.
 */
export interface OperationInfo {
  /**
   * The registered name for this item type.
   */
  type_name: string;
  /**
   * Documentation for the item.
   */
  documentation: Documentation;
  /**
   * Information about authorship for the item.
   */
  authors: Authors;
  /**
   * Generic properties of this item (description, tags, labels, references, ...).
   */
  context: Context;
  /**
   * The operation instance.
   */
  operation: Operation;
  /**
   * The operation types this operation belongs to.
   */
  operation_types: string[];
  /**
   * The inputs schema for this operation.
   */
  input_fields: {
    [k: string]: FieldInfo;
  };
  /**
   * The outputs schema for this operation.
   */
  output_fields: {
    [k: string]: FieldInfo;
  };
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface OperationTypeClassesInfo {
  /**
   * The group alias.
   */
  group_title?: string;
  /**
   * The operation info instances for each type.
   */
  item_infos: {
    [k: string]: OperationTypeInfo;
  };
  type_name?: "operation_type";
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface ValuesInfo {
  /**
   * The group alias.
   */
  group_title?: string;
  /**
   * The info items.
   */
  item_infos: {
    [k: string]: ItemInfo;
  };
}
/**
 * Base class that holds/manages information about an item within kiara.
 */
export interface ItemInfo {
  /**
   * The registered name for this item type.
   */
  type_name: string;
  /**
   * Documentation for the item.
   */
  documentation: Documentation;
  /**
   * Information about authorship for the item.
   */
  authors: Authors;
  /**
   * Generic properties of this item (description, tags, labels, references, ...).
   */
  context: Context;
}
/**
 * Base class that all models in kiara inherit from.
 *
 * This class provides utility functions for things like rendering the model on terminal or as html, integration into
 * a tree hierarchy of the overall kiara context, hashing, etc.
 */
export interface OperationGroupInfo {
  /**
   * The group alias.
   */
  group_title?: string;
  /**
   * The operation info instances for each type.
   */
  item_infos: {
    [k: string]: OperationInfo;
  };
}
/**
 * A model describing an internal server-side error.
 */
export interface InternalErrorModel {
  /**
   * The status code code.
   */
  status: number;
  /**
   * The error message.
   */
  msg: string;
  /**
   * More details about the underlying error.
   */
  exception?: {
    [k: string]: unknown;
  };
}
