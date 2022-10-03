## Description

TODO

## Development

### Requirements

- Python (version >= 3.8)
- pip, virtualenv
- git
- npm

- make (on Linux / Mac OS X -- optional)


### Prepare development environment


#### Conda env

Create a conda/mamba environment, then install those packages:

```
mamba install -c conda-forge -c dharpa -c anaconda kiara kiara_plugin.network_analysis kiara_plugin.language_processing
```

#### Other dependencies

Then, we need two as of yet unreleased Python dependencies, so, with the activated conda/mamba environment, do:

```
pip install 'git+https://github.com/DHARPA-Project/kiara_plugin.html.git'
pip install 'git+https://github.com/DHARPA-Project/kiara_plugin.service.git'
```

#### (Optional) Populate the *kiara* data store with example data

This makes it easier to work on the frontend stuff, since there is no way yet to onboard data there. Conda env must also be activate for this step:

```
git clone https://github.com/DHARPA-Project/kiara.examples.git
kiara run kiara.examples/examples/pipelines/network_analysis/create_network_graph.yaml --save network
kiara run kiara.examples/examples/pipelines/topic_modeling/topic_modeling.yaml --save topic
```

#### Run *kiara* rest service
To confirm that this worked, you can run the kiara web service, then point your browser to the API documentation page:

- `kiara service start`
- open in browser: http://127.0.0.1:8080/schema/swagger#/

Play around a bit with the endpoints, and check out what is available at the moment. We can add endpoints on a 'as-needed' basis.

#### Lumy

Now for the JavaScript part:

```
# clone (or fork) this repository 
git clone https://github.com/makkus/lumy.git

# enter the project directory
cd lumy

# install dependencies
npm install

# run dev server (kiara service from above also needs to be started in other terminal)
npm run dev
```

- 



## Copyright & license

This project is MPL v2.0 licensed, for the license text please check the [LICENSE](/LICENSE) file in this repository.
