<?php

namespace Graker\MapMarkers\Widgets;

use Backend\Classes\WidgetBase;
use Graker\MapMarkers\Models\Settings;


class MarkersMap extends WidgetBase {

    /**
     * @var string widget alias
     */
    protected $defaultAlias = 'markersmap';


    /**
     * @return array of widget info
     */
    public function widgetDetails() {
        return [
          'name' => 'graker.mapmarkers::lang.plugin.map_widget_name',
          'description' => 'graker.mapmarkers::lang.plugin.map_widget_description',
        ];
    }


    /**
     *
     * Renders widget HTML
     *
     * @return mixed
     */
    public function render() {
        $this->addGmapJs();
        return $this->makePartial('markersmap');
    }


    /**
     * Adds Google Map script and local asset script to page
     */
    protected function addGmapJs() {
        //local asset
        $this->addJs('/plugins/graker/mapmarkers/widgets/markersmap/assets/js/markersmap.js');

        //Google Map
        $key = (Settings::get('api_key')) ? 'key=' . Settings::get('api_key') . '&' : '';
        $this->addJs(
          'https://maps.googleapis.com/maps/api/js?' . $key . 'callback=markersMapInit',
          [
            'async',
            'defer',
          ]
        );
    }

}
