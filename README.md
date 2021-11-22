# OpenSearch Dashboards Sankey Diagram Plugin

This is a sankey diagram visType plugin for Opensearch Dashboards 1.1.0+, based on [uniberg/kbn_sankey_vis](https://github.com/uniberg/kbn_sankey_vis).

Here is an example:

![Sankey](sankey_7_10_Screenshot1.png)

# Install

```
git clone https://github.com/mmguero-dev/kbn_sankey_vis.git sankey_vis
cd sankey_vis
yarn install
yarn start
```
# Use
* Navigate to OpenSearch Dashboards (http://localhost:5601).
* Go to "Visualize" app.
* Click "Create visualization".
* Choose "Sankey Diagram"
# Uninstall

```
bin/opensearch-dashboards-plugin remove kbn-sankey-vis
```

# Building a Release
Building a release only means packaging the plugin with all its dependencies into a zip archive. Important is to put the plugin in a folder called opensearch-dashboards before zipping it.
The following steps would produce a release of the current head master branch.
```
mkdir opensearch-dashboards
git clone https://github.com/mmguero-dev/kbn_sankey_vis.git sankey_vis
cd sankey_vis
[optional] git checkout -branch
yarn install
yarn build --opensearch-dashboards-version X.Y.Z # replace 'X.Y.Z' by desired OpenSearch Dashboards version
```
