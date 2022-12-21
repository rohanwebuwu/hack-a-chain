/**
 * Copyright 2022 Design Barn Inc.
 */

import apiFetch from '@wordpress/api-fetch';

import { IErrorProps } from '../admin/settings/interfaces';
import { IHNResponseProps } from '../admin/settings/reducer';

const path: string = '/lottiefiles/v1/settings/';

// Fetch settings via the REST API endpoint
export const getSettings = async (): Promise<IHNResponseProps | boolean | IErrorProps> => {
  const data = await apiFetch({
    path,
    method: 'GET',
  }).catch(err => ({ ...err, error: true }));

  return data;
};

// Update settings via the REST API endpoint
export const updateSettings = async (data: unknown): Promise<IHNResponseProps> => {
  const updatedData = apiFetch({
    path,
    data,
    method: 'POST',
  }).catch(err => ({ ...err, error: true }));

  return updatedData;
};

// Delete settings via the REST API endpoint
export const deleteSettings = async (data: unknown): Promise<boolean> => {
  const deleteData = apiFetch({
    path,
    data,
    method: 'DELETE',
  }).catch(err => ({ ...err, error: true }));

  return deleteData;
};
