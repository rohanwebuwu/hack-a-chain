/**
 * Copyright 2021 Design Barn Inc.
 */

import { tracker, gqlFetch } from '@api/tracker';
import { mutation } from '@helpers/query-strings';

import { TrackerDefault } from '../helpers/interfaces';

let properties: object;
let notTracking: boolean;
let hcToken: string;

export class Client {
  private static instance: Client;

  public static async getInstance(
    apiKey: string,
    time: string,
    platform: string,
    appVersion: string,
    deviceId: string,
    sourceId: Float,
    token: string,
    _notTracking: boolean,
  ): Promise<TrackerDefault> {
    if (!Client.instance) {
      const instance = new Client();

      Client.instance = instance;
    }
    properties = { time, platform, appVersion, deviceId, sourceId, apiKey };
    notTracking = _notTracking ? _notTracking : false;
    hcToken = token;

    return Client.instance;
  }

  public async pluginTracking(options: Event): void {
    try {
      if (notTracking && properties.apiKey) {
        await tracker(properties.apiKey, [
          {
            event_type: options.eventType,
            user_id: options.userId && options.userId.toString(),
            location_lat: options.locationLat && options.locationLat,
            location_lng: options.locationLng && options.locationLng,
            version_name: options.versionName && options.versionName,
            library: options.library && options.library,
            os_name: options.osName && options.osName,
            os_version: options.osVersion && options.osVersion,
            device_brand: options.deviceBrand && options.deviceBrand,
            device_manufacturer: options.deviceManufacturer && options.deviceManufacturer,
            device_model: options.deviceModel && options.deviceModel,
            carrier: options.carrier && options.carrier,
            country: options.country && options.country,
            region: options.region && options.region,
            city: options.city && options.city,
            dma: options.dma && options.dma,
            idfa: options.idfa && options.idfa,
            idfv: options.idfv && options.idfv,
            adid: options.adid && options.adid,
            android_id: options.androidId && options.androidId,
            language: options.language && options.language,
            ip: options.ip && options.ip,
            uuid: options.uuid && options.uuid,
            event_properties: options.eventProperties && options.eventProperties,
            user_properties: options.userProperties && options.userProperties,
            price: options.price && options.price,
            quantity: options.quantity && options.quantity,
            revenue: options.revenue && options.revenue,
            productId: options.productId && options.productId,
            revenueType: options.revenueType && options.revenueType,
            event_id: options.eventId && options.eventId,
            session_id: options.sessionId && options.sessionId,
            insert_id: options.insertId && options.insertId,
            groups: options.groups && options.groups,
            time: properties.time ? properties.time : options.time && options.time,
            platform: properties.platform ? properties.platform : options.platform && options.platform,
            app_version: properties.appVersion ? properties.appVersion : options.appVersion && options.appVersion,
            device_id: properties.deviceId ? properties.deviceId : options.deviceId && options.deviceId,
          },
        ]);

        if (options.userId && options.method !== undefined && properties.sourceId) {
          gqlFetch(mutation.createHitCountEvent, hcToken, {
            resourceId: options.resourceId ? options.resourceId : options.userId, // if no resouceId use userId
            method: options.method,
            source: properties.sourceId,
            userId: options.userId && options.userId,
            visitorId: options.visitorId && options.visitorId,
          });
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
